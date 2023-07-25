import { Observable } from 'rxjs';

export interface ILoadingService {
  /**
   * Sets the loading$ property value based on the following:
   * - If loading is true, add the provided url to the loadingMap with a true value, set loading$ value to true
   * - If loading is false, remove the loadingMap entry and only when the map is empty will we set loading$ to false
   * This pattern ensures if there are multiple requests awaiting completion, we don't set loading to false before
   * other requests have completed. At the moment, this function is only called from the @link{HttpRequestInterceptor}
   * @param loading {boolean}
   * @param url {string}
   */
  setLoading(loading: boolean, url: string): void;

  /**
   * @returns Observable containing loading status, used to show/hide loading
   */
  getLoading(): Observable<boolean>;
}
