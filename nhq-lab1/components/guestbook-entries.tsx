"use client";

/**
 * TRƯỚC (useEffect + useState) — ~30 dòng logic:
 *
 * const [entries, setEntries] = useState([]);
 * const [loading, setLoading] = useState(true);
 * const [error, setError] = useState(null);
 *
 * useEffect(() => {
 *   async function fetchEntries() {
 *     try {
 *       const res = await fetch("/api/guestbook");
 *       if (!res.ok) throw new Error("Lỗi khi tải dữ liệu");
 *       const data = await res.json();
 *       setEntries(data);
 *     } catch (err) {
 *       setError("Không thể tải sổ lưu bút. Vui lòng thử lại.");
 *     } finally {
 *       setLoading(false);
 *     }
 *   }
 *   fetchEntries();
 * }, []);
 *
 * SAU (useSWR) — ~5 dòng logic:
 *
 * const { data: entries = [], isLoading, error } = useSWR("/api/guestbook", fetcher);
 *
 * Lợi ích: tự động cache, revalidate khi tab được focus, code ngắn hơn 80%.
 */

import { useState } from "react";
import useSWR from "swr";
import { GuestbookEntry } from "@/data/guestbook";
import DeleteButton from "@/components/delete-button";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const ITEMS_PER_PAGE = 5;

export default function GuestbookEntries() {
  const {
    data: entries = [],
    isLoading,
    error,
  } = useSWR<GuestbookEntry[]>("/api/guestbook", fetcher);

  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(entries.length / ITEMS_PER_PAGE);
  const paginatedEntries = entries.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  if (isLoading) {
    return (
      <div className="text-center py-8 text-gray-400">
        Đang tải lời nhắn...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-400">
        Không thể tải sổ lưu bút. Vui lòng thử lại.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-400">{entries.length} lời nhắn</p>

      {paginatedEntries.map((entry) => (
        <div
          key={entry.id}
          className="border rounded-lg p-4 hover:shadow-sm transition-shadow"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-800">{entry.name}</span>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400">
                {new Date(entry.createdAt).toLocaleDateString("vi-VN")}
              </span>
              <DeleteButton id={entry.id} />
            </div>
          </div>
          <p className="text-gray-600">{entry.message}</p>
        </div>
      ))}

      {entries.length === 0 && (
        <p className="text-center text-gray-400 py-8">
          Chưa có lời nhắn nào. Hãy là người đầu tiên!
        </p>
      )}

      {/* Phân trang */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            ← Trang trước
          </button>
          <span className="text-sm text-gray-500">
            Trang {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Trang sau →
          </button>
        </div>
      )}
    </div>
  );
}
