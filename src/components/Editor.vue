<template>
  <aside id="editor">
    <div *ngFor="let line of lines; let i = index" id="{{i}}" class="row" (click)="focus($event)">
      <div title="{{i}}">{{i + 1}}</div>
      <div title="{{i}}">
        <span *ngFor="let token of line; let j = index" title="{{j}}" class="{{token.type}}">
            {{token.content}}
        </span>
      </div>
    </div>
    <div id="caret" class="hidden">|</div>
    <button nz-button id="run" aria-label="run psl program" nzType="primary" nzShape="circle" (click)="run($event)">
      <i nz-icon nzType="caret-right"></i>
    </button>
  </aside>
</template>