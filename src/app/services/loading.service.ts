import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ILoadingService } from '../models/loading-service.model';

@Injectable({
  providedIn: 'root',
})
export class LoadingService implements ILoadingService {
  private loadingStatus: boolean;
  private loading$: BehaviorSubject<boolean>;
  /**
   * Contains in-progress loading requests
   */
  private loadingMap: Map<string, boolean>;

  constructor() {
    this.loadingStatus = false;
    this.loading$ = new BehaviorSubject<boolean>(this.loadingStatus);
    this.loadingMap = new Map<string, boolean>();
  }

  setLoading(loading: boolean, url: string): void {
    if (!url) {
      throw new Error(
        'The request URL must be provided to the LoadingService.setLoading function'
      );
    }
    if (loading === true) {
      this.loadingMap.set(url, loading);
      this.loading$.next(true);
    } else if (loading === false && this.loadingMap.has(url)) {
      this.loadingMap.delete(url);
    }
    if (this.loadingMap.size === 0) {
      this.loading$.next(false);
    }
  }

  getLoading(): Observable<boolean> {
    return this.loading$.asObservable();
  }
}
