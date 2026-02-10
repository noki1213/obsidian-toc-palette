> Japanese documentation is available below. (日本語ドキュメントは下部にあります)

# TOC Navigator

An Obsidian plugin that displays an interactive table of contents for the current note. Quickly navigate to any heading with keyboard shortcuts.

## Features

### Interactive TOC Modal

- Opens a searchable list of all headings (H1 through H6) in the current note.
- Headings are indented according to their level for a clear visual hierarchy.
- Each heading shows its level prefix (H1, H2, H3, etc.).
- The heading where your cursor is currently located is automatically highlighted when the modal opens.

### Breadcrumb Navigation

- A breadcrumb bar appears between the search box and the heading list.
- Shows the parent heading hierarchy of the currently selected item in the format: Parent H1 〉 Parent H2 〉
- Updates dynamically as you navigate through the list with arrow keys.

### Search and Filter

- Type in the search box to filter headings by text.
- Case-insensitive matching.
- Results update in real time as you type.

### Keyboard Navigation

| Key | Action |
|-----|--------|
| Arrow Up / Down | Move through headings (stops at boundaries) |
| Enter | Jump to the selected heading |
| Type text | Filter headings by search query |

Navigation stops at the first and last heading, so you always know when you have reached the boundary.

### Click Navigation

- Click on any heading in the list to jump directly to it.

## Commands

- Open TOC Navigator: Opens the TOC modal for the current note.

This command can be assigned a custom hotkey in Obsidian settings.

## Installation

### Via BRAT

1. Install the BRAT plugin.
2. Add `noki1213/obsidian-toc-navigator` as a beta plugin.

### Manual

1. Download `main.js`, `manifest.json`, and `styles.css` from the latest release.
2. Create a folder named `obsidian-toc-navigator` in your vault's `.obsidian/plugins/` directory.
3. Place the downloaded files in that folder.
4. Enable the plugin in Obsidian settings.

---

# TOC Navigator

現在のノートの目次をインタラクティブに表示する Obsidian プラグインです。キーボード操作で任意の見出しにすばやく移動できます。

## 機能

### インタラクティブな目次モーダル

- 現在のノートにあるすべての見出し（H1 から H6）を検索可能なリストで表示します。
- 見出しはレベルに応じてインデントされ、階層構造がわかりやすく表示されます。
- 各見出しにはレベル表示（H1, H2, H3 など）が付きます。
- モーダルを開いたとき、カーソルがある位置の見出しに自動的にフォーカスが当たります。

### パンくずナビゲーション

- 検索ボックスと見出しリストの間にパンくずバーが表示されます。
- 選択中の見出しの親階層を、親 H1 〉 親 H2 〉 の形式で表示します。
- 矢印キーで移動するたびにリアルタイムで更新されます。

### 検索とフィルタリング

- 検索ボックスにテキストを入力して見出しを絞り込めます。
- 大文字・小文字を区別しません。
- 入力に応じてリアルタイムに結果が更新されます。

### キーボード操作

| キー | 動作 |
|------|------|
| 上下キー | 見出し間を移動（先頭・末尾で停止） |
| Enter | 選択した見出しにジャンプ |
| テキスト入力 | 見出しを検索・フィルタリング |

一番上と一番下の見出しで移動が止まるため、常に位置を把握できます。

### クリック操作

- リスト内の任意の見出しをクリックして、直接その場所にジャンプできます。

## コマンド

- Open TOC Navigator: 現在のノートの目次モーダルを開きます。

このコマンドには Obsidian の設定からカスタムホットキーを割り当てられます。

## インストール

### BRAT 経由

1. BRAT プラグインをインストールします。
2. `noki1213/obsidian-toc-navigator` をベータプラグインとして追加します。

### 手動インストール

1. 最新リリースから `main.js`、`manifest.json`、`styles.css` をダウンロードします。
2. Vault の `.obsidian/plugins/` に `obsidian-toc-navigator` フォルダを作成します。
3. ダウンロードしたファイルをそのフォルダに配置します。
4. Obsidian の設定でプラグインを有効にします。
