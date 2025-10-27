export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-400 rounded-full animate-spin"></div>
    </div>
  );
}
