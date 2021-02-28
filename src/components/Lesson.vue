<template>
  <aside class="lesson">
    <button nz-button id="back" aria-label="previous lesson" nzType="primary" nzShape="circle" (click)="back($event)">
      <i nz-icon nzType="left"></i>
    </button>
    <button nz-button id="next" aria-label="next lesson" nzType="primary" nzShape="circle" (click)="next($event)">
      <i nz-icon nzType="right"></i>
    </button>
    <div *ngFor="let line of lines" class="{{line.type}}">
      <div *ngFor="let content of line.content">
        {{content}}
      </div>
    </div>
  </aside>
</template>