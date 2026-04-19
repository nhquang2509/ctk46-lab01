"use client";

import { useState } from "react";
import { mutate } from "swr";

export default function DeleteButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm("Bạn có chắc muốn xóa lời nhắn này?")) return;
    setIsDeleting(true);
    try {
      await fetch(`/api/guestbook/${id}`, { method: "DELETE" });
      await mutate("/api/guestbook");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-xs text-red-400 hover:text-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isDeleting ? "Đang xóa..." : "Xóa"}
    </button>
  );
}
