import Link from "next/link";
import { Post } from "@/types/post";

async function getPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error("Không thể tải danh sách bài viết");
  }
  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Blog</h1>
      <p className="text-gray-500 mb-6">
        Tổng cộng {posts.length} bài viết từ API
      </p>
      <div className="space-y-6">
        {posts.slice(0, 10).map((post) => (
          <article
            key={post.id}
            className="border rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                Tác giả #{post.userId}
              </span>
              <span className="text-sm text-gray-400">Bài #{post.id}</span>
            </div>
            <Link href={`/blog/${post.id}`}>
              <h2 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors capitalize">
                {post.title}
              </h2>
            </Link>
            <p className="text-gray-600 line-clamp-2">{post.body}</p>
            <Link
              href={`/blog/${post.id}`}
              className="inline-block mt-3 text-blue-600 text-sm hover:underline"
            >
              Đọc thêm →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
