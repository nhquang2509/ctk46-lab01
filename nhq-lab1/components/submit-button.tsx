/**
 * SubmitButton — nút submit tái sử dụng cho nhiều form.
 *
 * Sử dụng useFormStatus() (React DOM hook) để tự động đọc trạng thái
 * pending của <form> cha gần nhất mà không cần truyền prop xuống thủ công.
 *
 * Cách dùng:
 *   <form action={formAction}>
 *     ...
 *     <SubmitButton>Gửi lời nhắn</SubmitButton>
 *     <SubmitButton pendingText="Đang đăng nhập..." className="...">Đăng nhập</SubmitButton>
 *   </form>
 *
 * Lưu ý quan trọng:
 *   - Component này PHẢI được render bên trong thẻ <form>.
 *   - useFormStatus() chỉ hoạt động với React 19 / Next.js 15+.
 *   - Không cần truyền trạng thái "isPending" như khi dùng useActionState
 *     vì hook tự lấy từ context của form cha.
 */

"use client";

import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  children: React.ReactNode;
  /** Nội dung hiển thị khi đang gửi. Mặc định: "Đang gửi..." */
  pendingText?: string;
  /** Class Tailwind tuỳ chỉnh. Mặc định: nút xanh full-width */
  className?: string;
}

export default function SubmitButton({
  children,
  pendingText = "Đang gửi...",
  className = "w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
}: SubmitButtonProps) {
  // useFormStatus đọc trạng thái của <form> cha gần nhất
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? pendingText : children}
    </button>
  );
}
