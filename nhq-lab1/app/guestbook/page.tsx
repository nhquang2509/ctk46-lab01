import GuestbookForm from "@/components/guestbook-form";
import GuestbookEntries from "@/components/guestbook-entries";

export default function GuestbookPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Sổ lưu bút</h1>
      <p className="text-gray-500 mb-8">Hãy để lại lời nhắn cho tôi nhé!</p>

      <GuestbookForm />

      <GuestbookEntries />
    </div>
  );
}
