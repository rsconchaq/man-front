import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface DualListItem {
  [key: string]: any;
}

@Component({
  selector: 'app-dual-listbox',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dual-listbox.component.html',
  styleUrls: ['./dual-listbox.component.scss']
})
export class DualListboxComponent implements OnInit, OnChanges {
  @Input() availableItems: DualListItem[] = [];
  @Input() selectedItems: DualListItem[] = [];
  @Input() key: string = 'id';
  @Input() display: string = 'name';
  @Input() showSearchBox = true;
  @Input() height = '300px';
  @Output() selectionChange = new EventEmitter<DualListItem[]>();

  public availableFilteredItems: DualListItem[] = [];
  public selectedFilteredItems: DualListItem[] = [];
  public availableSearchTerm = '';
  public selectedSearchTerm = '';
  public selectedAvailableItem: DualListItem | null = null;
  public selectedSelectedItem: DualListItem | null = null;

  ngOnInit(): void {
    this.initializeItems();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['availableItems'] || changes['selectedItems']) {
      this.initializeItems();
    }
  }

  private initializeItems(): void {
    this.availableFilteredItems = [...this.availableItems];
    this.selectedFilteredItems = [...this.selectedItems];
  }

  public filterItems(listType: 'available' | 'selected'): void {
    if (listType === 'available') {
      const term = this.availableSearchTerm.toLowerCase();
      this.availableFilteredItems = this.availableItems.filter(item =>
        this.getDisplayValue(item).toLowerCase().includes(term)
      );
    } else {
      const term = this.selectedSearchTerm.toLowerCase();
      this.selectedFilteredItems = this.selectedItems.filter(item =>
        this.getDisplayValue(item).toLowerCase().includes(term)
      );
    }
  }

  public selectAvailableItem(item: DualListItem): void {
    this.selectedAvailableItem = this.selectedAvailableItem === item ? null : item;
  }

  public selectSelectedItem(item: DualListItem): void {
    this.selectedSelectedItem = this.selectedSelectedItem === item ? null : item;
  }

  public moveToSelected(): void {
    if (this.selectedAvailableItem) {
      this.selectedItems.push(this.selectedAvailableItem);
      this.availableItems = this.availableItems.filter(
        item => item[this.key] !== this.selectedAvailableItem![this.key]
      );
      this.selectedAvailableItem = null;
      this.initializeItems();
      this.emitChange();
    }
  }

  public moveToAvailable(): void {
    if (this.selectedSelectedItem) {
      this.availableItems.push(this.selectedSelectedItem);
      this.selectedItems = this.selectedItems.filter(
        item => item[this.key] !== this.selectedSelectedItem![this.key]
      );
      this.selectedSelectedItem = null;
      this.initializeItems();
      this.emitChange();
    }
  }

  public moveAllToSelected(): void {
    this.selectedItems = [...this.selectedItems, ...this.availableItems];
    this.availableItems = [];
    this.selectedAvailableItem = null;
    this.initializeItems();
    this.emitChange();
  }

  public moveAllToAvailable(): void {
    this.availableItems = [...this.availableItems, ...this.selectedItems];
    this.selectedItems = [];
    this.selectedSelectedItem = null;
    this.initializeItems();
    this.emitChange();
  }

  public getDisplayValue(item: DualListItem): string {
    return item[this.display] || '';
  }

  public isSelectedAvailable(item: DualListItem): boolean {
    return this.selectedAvailableItem === item;
  }

  public isSelectedSelected(item: DualListItem): boolean {
    return this.selectedSelectedItem === item;
  }

  public trackByFn(index: number, item: DualListItem): any {
    return item[this.key];
  }

  private emitChange(): void {
    this.selectionChange.emit([...this.selectedItems]);
  }
}
