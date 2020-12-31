import { FbPaging } from "./base";

export interface IFbDescriptionTagsData {
  id: string;
  length: number;
  name: string;
  offset: number;
  type: "page";
}

export interface IFbAttachmentsData {
  description?: string;
  description_tags?: IFbDescriptionTagsData[];
  media: {
    image: {
      height: number;
      src: string;
      width: number;
    };
    target: {
      id: string;
      url: string;
    };
    title: string;
    type:
      | "photo"
      | "video_inline"
      | "profile_media"
      | "video_direct_response"
      | "share";
    url: string;
  };
}

export interface IFbCommentsData {
  created_time: string;
  message: string;
  id: string;
}

export interface IFbPostData {
  attachments: {
    data: IFbAttachmentsData[];
  };
  message: string;
  id: string;
  comments?: {
    data: IFbCommentsData[];
    paging: FbPaging;
  };
}
