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
		
		const textEl = container.createSpan({ text: item.heading });
		
		// 今いる場所だったら印をつける
		if (item.isCurrent) {
			container.addClass("is-current-heading");
			container.createSpan({ text: " 〉", cls: "current-marker" });
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
