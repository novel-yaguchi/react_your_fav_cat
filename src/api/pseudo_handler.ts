const LOCAL_STORAGE_KEY = "your-fav-cat";
const LAG = 500;

export interface CatInfo {
  image: string;
  date: Date;
}
export interface CatStrInfo {
  image: string;
  date: string;
}
export type Path = "./data/save" | "./data/load";
export type Data = Array<CatInfo> | undefined;
export type StrData = Array<CatStrInfo>;

export default class PseudoHandler {
  private readonly path: Path;
  private data?: Data;

  constructor(path: Path) {
    this.path = path;

    this.data = undefined;
  }

  async get(): Promise<Data> {
    switch (this.path) {
      case "./data/load":
        await this.sleep(452);

        this.loadData();
        break;

      default:
        throw new Error(
          `The API for path given is not implemented for get method: ${this.path}`
        );
    }

    return this.data;
  }

  async post(data: Data): Promise<boolean> {
    switch (this.path) {
      case "./data/save":
        await this.sleep(LAG);

        this.saveData(data);
        break;

      default:
        throw new Error(
          `The API for path given is not implemented for get method: ${this.path}`
        );
    }

    return true;
  }

  async sleep(duration: number): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, duration));
  }

  formatDate(catStrInfo: CatStrInfo): CatInfo {
    return Object.assign({}, catStrInfo, {
      date: new Date(catStrInfo.date)
    });
  }

  loadData() {
    const dataStr = localStorage.getItem(LOCAL_STORAGE_KEY);

    this.data = dataStr ? JSON.parse(dataStr).map(this.formatDate) : [];
  }

  saveData(data: Data = []) {
    const dataStr = JSON.stringify(data);

    localStorage.setItem(LOCAL_STORAGE_KEY, dataStr);
  }
}
