import Link from "next/link";

export default function BlogNotFound() {
  return (
    <div className="text-center py-16">
      <h2 className="text-2xl font-bold mb-4">Bài viết không tồn tại</h2>
      <p className="text-gray-600 mb-6">
        Bài viết bạn tìm kiếm không tồn tại hoặc đã bị xóa.
      </p>
      <Link href="/blog" className="text-blue-600 hover:underline">
        ← Quay lại danh sách bài viết
      </Link>
    </div>
  );
}
