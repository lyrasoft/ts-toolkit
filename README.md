# LYRASOFT TS Utilities

LYRASOFT 專案用各類實用 TS/JS 工具集。

<!-- TOC -->
* [LYRASOFT TS Utilities](#lyrasoft-ts-utilities)
  * [安裝](#安裝)
    * [入口](#入口)
  * [Generic](#generic)
    * [AlertAdapter](#alertadapter)
    * [Crypto](#crypto)
    * [DateTime](#datetime)
    * [Number](#number)
    * [Queue & Stack](#queue--stack)
    * [Promise](#promise)
    * [Timing](#timing)
    * [Typography](#typography)
  * [Vue 專用](#vue-專用)
    * [Reactive](#reactive)
    * [Loading](#loading)
    * [LifeCycle](#lifecycle)
    * [Utilities](#utilities)
  * [Ionic 專用](#ionic-專用)
    * [Alert](#alert)
    * [Loading](#loading-1)
    * [常用工具組](#常用工具組)
  * [後續](#後續)
<!-- TOC -->

## 安裝

```shell
yarn add @lyrasoft/ts-toolkit --dev
```

### 入口

主要有三個入口

```ts
// 一般專案用
import { ... } from '@lyrasoft/ts-toolkit/src/generic';

// Vite/Vue 專案用
import { ... } from '@lyrasoft/ts-toolkit/src/vue';

// Ionic/Vue 專案用
import { ... } from '@lyrasoft/ts-toolkit/src/ionic';
```

主要差異在某些 UI 介面，Ionic 的版本會改用 Ionic 專屬 UI 元素。

## Generic

### AlertAdapter

預設的 `AlertAdapter` 用內建 `alert()`，如果你想要在專案中改用 SweetAlert 可以先安裝

```shell
yarn add sweetalert --dev
```

然後在 `main.ts` 設定

```ts
import { useSweetAlertAdapter } from '@lyrasoft/ts-toolkit/src/generic';

useSweetAlertAdapter(true);
```

這樣就可以用以下函式快速呼叫 SweetAlert，有三個常用函式

```ts
import { simpleAlert, simpleConfirm, simpleDeleteConfirm } from '@lyrasoft/ts-toolkit/src/generic';

// Alert
await simpleAlert('Title', 'text', 'icon');

// 第四個參數可以覆蓋 swal options
await simpleAlert('Title', 'text', 'icon', { buttons: ['Cancel', 'OK'] });

// Confirm
const v = await simpleConfirm('Confirm title', 'Text', 'icon');

if (v) {
  // ...
}

// Delete Confirm (顯示的文字會不一樣)
const d = await simpleDeleteConfirm('Confirm title', 'Text', 'icon');

if (d) {
  // ...
}
```

載入 Bootstrap 樣式

```scss
// 要放在 BS _variables.scss 後面，因為會用到 BS 變數

@import "@lyrasoft/ts-toolkit/src/scss/sweetalert-bootstrap5";

// ...
```

手動覆蓋，如果你的專案用的是別套 alert，可以手動設定

```ts
import { AlertAdapter } from '@lyrasoft/ts-toolkit/src/generic';

AlertAdapter.alert = (title: string, text?: string, icon?: string, extra?: any) => Promise<boolean>;
AlertAdapter.confirm = (title: string, text?: string, icon?: string, extra?: any) => Promise<boolean>;
AlertAdapter.deleteConfirm = (title: string, text?: string, icon?: string, extra?: any) => Promise<boolean>;
```

設定文字

```ts
import { AlertAdapter } from './alert-adapter';

AlertAdapter.confirmText = () => '確認';
AlertAdapter.cancelText = () => '取消';
AlertAdapter.deleteText = () => '刪除';
```

### Crypto

```ts
import {
  base64UrlDecode,
  base64UrlEncode,
  randomBytesString,
  randomString, 
  STR_SEED_BASE62,
  tid,
  uid,
} from '@lyrasoft/ts-toolkit/src/generic';

uid();
tid();
randomBytesString(16);
randomString(32, STR_SEED_BASE62);
base64UrlEncode();
base64UrlDecode();
```

### DateTime

簡單的 `dateToFormat()` 用於任何地方。需要 `dayjs`

```shell
yarn add dayjs --dev
```

```vue

<script lang="ts" setup>
  import { dateToFormat, DateFormat } from '@lyrasoft/ts-toolkit/src/generic';
</script>

<template>
  <div>
    {{ dateToFormat(item.created, 'yyyy-MM-dd') }}

    {{ dateToFormat(item.created, DateFormat.YMD_HI) }}
  </div>
</template>
```

### Number

```ts
import { numberFormat } from '@lyrasoft/ts-toolkit/src/generic';

numberFormat(123456); // 123,456
```

### Queue & Stack

```ts
import { queue, stack } from './queue';

const q = queue(1); // 一次只能執行一個

// 會依序執行
q.push(async () => ...);
q.push(async () => ...);
q.push(async () => ...);
q.push(async () => ...);

// -------------

const s = stack();

s.observe(() => ...) // 監聽改變

s.push(...);
s.push(...);
s.push(...);
s.push(...);

s.pop(); // 觸發事件
```

### Promise

快速建立可以從外部 resolve 的 Promise

```ts
import { promiseWithResolvers } from '@lyrasoft/ts-toolkit/src/generic';

const { promise, resolve ,reject } = promiseWithResolvers();

resolve();
```

等同 ES2024 [Promise.withResolvers()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/withResolvers)

### Timing

快速 sleep，用來取代 `setTimeout()`

```ts
import { sleep } from '@lyrasoft/ts-toolkit/src/generic';

await sleep(500);
```

`nextTick()` 快速將後續程式推入下個循環

```ts
await nextTick();
nextTick().then(() => ...);

// OR

nextTick(() => ...);
```

### Typography

一些印出文字或摘要的方便函式

```ts
import { nl2br, htmlEscape, stripHtml, summaryText } from '@lyrasoft/ts-toolkit/src/generic';

// NL to <br>
nl2br(text);

// Escape HTML 後，再將 nl to <br>
// 用來印出換行的純文字
htmlEscape(text, true);

// 移除 HTML tags
stripHtml(html);

// 截斷文字，並且如果有截斷的話，顯示 ...
summaryText(text, 150);
```

## Vue 專用

需要安裝 `vue`

### Reactive

`unrefs()` 用來將物件內的 refs 轉回一般變數，方便用在呼叫 API 時丟參數

```ts
import { unrefs } from '@lyrasoft/ts-toolkit/src/vue';
import { ref } from 'vue';

const foo = ref();
const bar = ref();

await apiClient.post(
  'api/foo/item',
  unrefs({
    foo,
    bar
  })
)
```

`wrapRef()` 與 `wrapRefs()` 則用來強制包裹變數成為 ref，若原本已是 ref 或 computed 則原封不動返回。

### Loading

常用的 `useLoading()` 現在可以直接呼叫，不用自己寫了

```vue
<script lang="ts" setup>
  import { useLoading } from '@lyrasoft/ts-toolkit/src/vue';

  const { loading, run } = useLoading();

  async function submit() {
    await run(async () => {
      const res = await apiClient.post(...);
      
      // ...
    });
  }
</script>

<template>
  <button :disabled="loading" @click="submit">Submit</button>
</template>
```

### LifeCycle

需要 `vue-router`

當 router 有時可能原地換頁時，我們通常會這樣寫：

```ts
import { onMounted } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';

const route = useRoute();

onMounted(() => {
  loadItem(route.params.id);
});

onBeforeRouteUpdate((to) => {
  loadItem(to.params.id);
});
```

現在我們可以這樣寫

```ts
import { onMountedOrRouteUpdate } from '@lyrasoft/ts-toolkit/src/vue';

onMountedOrRouteUpdate((to) => {
  loadItem(to.params.id);
});
```

另外，如果搭配 Suspense 時，可能會這樣寫

```ts
import { onBeforeRouteUpdate, useRoute } from 'vue-router';

const route = useRoute();

onBeforeRouteUpdate((to) => {
  loadItem(to.params.id);
});

await loadItem(route.params.id);
```

現在可以改成這樣做

```ts
import { onCreatedOrRouteUpdate } from '@lyrasoft/ts-toolkit/src/vue';

const item = ref();

await onCreatedOrRouteUpdate(async (to) => {
  item.value = await loadItem(to.params.id);
});
```

如果您想要避免前面宣告的變數可能是 `undefined`，可以改成這樣：

```ts
import { loadInstantAndRouteUpdate } from '@lyrasoft/ts-toolkit/src/vue';

const { item, bar, yoo } = await loadInstantAndRouteUpdate(async () => {
  const res = await apiClient.get(...);
  
  return res.data.data as {
    item: FooItem,
    bar: Bar,
    yoo: Yoo,
  };
});
```

如此這些 API 載入回來的變數都不會有 undefined type，因為他們都是等待載入完後才宣告的。

### Utilities

`uniqueItem()` 與 `uniqueItemList()` 用來將列表物件自動加上 `uid`

```ts
import { uniqueItemList } from '@lyrasoft/ts-toolkit/src/vue';

const res = await axios.get(...);
const rawItems = res.data.data;

// 型別會自動加上 uid
const items = uniqueItemList(items);

// 可以自訂欄位
const items = uniqueItemList(items, '__key');
```

## Ionic 專用

### Alert

初始化

```ts
// main.ts

import { useIonicAlertAdapter } from '@lyrasoft/ts-toolkit/src/ionic';

useIonicAlertAdapter();
```

這樣以下三個常用函式，就會自動轉成 Ionic 格式

```ts
simpleAlert();
simpleConfirm();
simpleDeleteConfirm();
```

### Loading

Ionic 額外多了 `useLoadingOverlay()` 可以用，可建立覆蓋全頁的 loading overlay

```ts
const { run, loading } = useLoadingOverlay('Loading...', options);
```

### 常用工具組

```ts
import { ionicActionSheetConfirm, ionicToast } from '@lyrasoft/ts-toolkit/src/ionic';

ionicActionSheetConfirm('text', buttons);
ionicToast('text', position, 5000);
```

## 後續

由於這是一個實用工具集，新功能會隨時加上去。如果文件沒看到，可以直接到原始碼裡面翻翻看有沒有用的上的東西。

如果你覺得缺少一個常用工具，可以直接開 PR 加上去。
