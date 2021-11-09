import { ArticleComment, CreateCommentDto } from "store/types/comment.type";
import $api from "./index";

const api = process.env.NEXT_PUBLIC_DOMAIN_API;

export default class CommentService {
  static async create(
    createComment: CreateCommentDto
  ): Promise<ArticleComment> {
    const { data } = await $api.post<ArticleComment>(
      `${api}/comments`,
      createComment
    );

    return data;
  }

  static async delete(commentId): Promise<number> {
    const { data } = await $api.delete<{ data: number }>(
      `${api}/comments/${commentId}`
    );
    return data.data;
  }
}
