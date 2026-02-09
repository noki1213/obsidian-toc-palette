const { Plugin, SuggestModal, MarkdownView } = require('obsidian');

module.exports = class TOCNavigator extends Plugin {
	async onload() {
		// コマンド（ショートカットキーを設定できる機能）を追加
		this.addCommand({
			id: 'open-toc-navigator',
			name: 'Open TOC Navigator',
			callback: () => {
				const view = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (view) {
					new TOCModal(this.app, view).open();
				}
			}
		});
	}
};

// 目次を表示するための画面（モーダル）の設定
class TOCModal extends SuggestModal {
	constructor(app, view) {
		super(app);
		this.view = view;
		this.setPlaceholder("見出しを検索・選択してください");
		
		// パンくずリストを表示するためのエリアを作る
		this.breadcrumbEl = createDiv({ cls: "toc-breadcrumb" });
	}

	// モーダルが開いた時の処理
	onOpen() {
		super.onOpen();

		// モーダル自体に専用のクラスをつけて、CSSで高さを調整できるようにする
		const modalEl = this.contentEl.closest('.modal');
		if (modalEl) {
			modalEl.addClass("toc-navigator-modal");
		}
		
		// 検索窓が入っているコンテナを探して、その直後にパンくずリストを入れる
		const inputContainer = this.inputEl.parentElement;
		if (inputContainer) {
			inputContainer.insertAdjacentElement('afterend', this.breadcrumbEl);
		}
		
		// 画面が出来上がるのを一瞬待ってから、今いる場所にフォーカスを当てる
		requestAnimationFrame(() => {
			const suggestions = this.getSuggestions("");
			const currentIndex = suggestions.findIndex(s => s.isCurrent);
			
			if (currentIndex !== -1 && this.chooser) {
				this.chooser.setSelectedItem(currentIndex);
				this.updateBreadcrumb(suggestions[currentIndex]);
			}
		});

		// 選択が変わったときにパンくずリストを更新する仕組み
		const self = this;
		const originalSetSelectedItem = this.chooser.setSelectedItem;
		this.chooser.setSelectedItem = function(index, evt) {
			originalSetSelectedItem.apply(this, [index, evt]);
			const suggestions = self.getSuggestions(self.inputEl.value);
			if (suggestions[index]) {
				self.updateBreadcrumb(suggestions[index]);
			}
		};
	}

	// パンくずリストを更新する
	updateBreadcrumb(selectedItem) {
		const cache = this.app.metadataCache.getFileCache(this.view.file);
		if (!cache || !cache.headings) return;

		const allHeadings = cache.headings;
		const breadcrumbs = [];
		
		// 選択された見出しの親階層を辿る
		let currentLevel = selectedItem.level;
		const selectedIndex = allHeadings.findIndex(h => h.position.start.offset === selectedItem.position.start.offset);
		
		for (let i = selectedIndex; i >= 0; i--) {
			if (allHeadings[i].level < currentLevel) {
				breadcrumbs.unshift(allHeadings[i].heading);
				currentLevel = allHeadings[i].level;
			}
			if (currentLevel === 1) break;
		}

		if (breadcrumbs.length > 0) {
			this.breadcrumbEl.setText(breadcrumbs.join(" 〉 ") + " 〉");
			this.breadcrumbEl.style.display = "block";
		} else {
			this.breadcrumbEl.style.display = "none";
		}
	}

	// 表示するリスト（見出し一覧）を作る
	getSuggestions(query) {
		const cache = this.app.metadataCache.getFileCache(this.view.file);
		if (!cache || !cache.headings) return [];

		const headings = cache.headings;
		const cursorLine = this.view.editor.getCursor().line;

		// カーソル位置の直前にある見出しを1つだけ特定する
		let currentHeadingIndex = -1;
		for (let i = 0; i < headings.length; i++) {
			if (headings[i].position.start.line <= cursorLine) {
				currentHeadingIndex = i;
			} else {
				break;
			}
		}

		return headings.map((h, index) => {
			return {
				...h,
				isCurrent: index === currentHeadingIndex
			};
		}).filter(h => h.heading.toLowerCase().includes(query.toLowerCase()));
	}

	// リストの見た目を作る
	renderSuggestion(item, el) {
		const container = el.createDiv({ cls: "toc-nav-item" });
		
		// 見出しのレベルに合わせてインデント（隙間）を作る
		container.style.paddingLeft = `${(item.level - 1) * 20}px`;
		
		// 見出しレベル（H1, H2...）を表示
		container.createSpan({ text: `H${item.level} `, cls: "toc-level-prefix" });
		
		// 見出しの本文を表示
		container.createSpan({ text: item.heading });
		
		// 今いる場所だったら印をつける
		if (item.isCurrent) {
			container.addClass("is-current-heading");
		}
	}

	// 選んだ時の動作（そこへ移動する）
	onChooseSuggestion(item, evt) {
		this.view.editor.setCursor(item.position.start.line, 0);
		this.view.editor.scrollIntoView({
			from: { line: item.position.start.line, ch: 0 },
			to: { line: item.position.start.line, ch: 0 }
		}, true);
	}
}
