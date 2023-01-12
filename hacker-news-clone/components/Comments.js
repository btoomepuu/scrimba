import { getComments } from '../pages/items.js';

export default function Comment(comment) {
  const hasNestedComments = 'kids' in comment;
  console.log(hasNestedComments);

  return `
		<div class="nested-comments-0">
			<p class="comment-header">
			${comment.by} | ${comment.time} hours ago
			</p>
			${comment.text}

		</div>
	`;
}
