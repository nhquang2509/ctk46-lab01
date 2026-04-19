"use client";

import { useActionState, useEffect } from "react";
import { mutate } from "swr";
import { createGuestbookEntry, ActionState } from "@/app/guestbook/actions";
import SubmitButton from "@/components/submit-button";

const initialState: ActionState = {
  success: false,
};

export default function GuestbookForm() {
  const [state, formAction] = useActionState(
    createGuestbookEntry,
    initialState
  );

  // Khi gửi thành công → yêu cầu SWR refetch danh sách
  useEffect(() => {
    if (state.success) {
      mutate("/api/guestbook");
    }
  }, [state.success]);

  return (
    <form action={formAction} className="bg-gray-50 rounded-lg p-6 mb-8 space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Tên của bạn
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Nhập tên của bạn"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {state.errors?.name && (
          <p className="text-red-500 text-sm mt-1">{state.errors.name[0]}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Lời nhắn
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Viết lời nhắn của bạn..."
          required
          rows={3}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
        {state.errors?.message && (
          <p className="text-red-500 text-sm mt-1">
            {state.errors.message[0]}
          </p>
        )}
      </div>
      <SubmitButton className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
        Gửi lời nhắn
      </SubmitButton>
      {state.success && (
        <p className="text-green-600 text-sm">Gửi lời nhắn thành công!</p>
      )}
    </form>
  );
}
