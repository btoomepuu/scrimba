import { getComments } from '../pages/items.js';

export const Comment = (comment) => {
  const hasNestedComments = 'kids' in comment;
  console.log(comment);
  return `
		<div class="nested-comments-0}">
			<p class="comment-header">
			${comment.by} | ${comment.time} hours ago
			</p>
			${comment.text}
			${
        hasNestedComments
          ? comment.comments.map((comment) => Comment(comment)).join('')
          : ''
      }
			
		</div>
	`;
};
