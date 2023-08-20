export interface IVideoDetail {
  id: number;
  title: string;
  url: string;
}

export interface IOpenVideoDetail {
  isOpen: boolean;
  video?: IVideoDetail;
}
