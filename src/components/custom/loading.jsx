const Loading = () => {
  return (
    <div className="fixed gap-2 items-center justify-center bg-white z-50 flex inset-0 bg-opacity-5 backdrop-blur-sm transition-opacity duration-500 opacity-100">
      <div class="flex gap-2">
        <div class="w-5 h-5 rounded-full animate-pulse bg-primary"></div>
        <div class="w-5 h-5 rounded-full animate-pulse bg-primary"></div>
        <div class="w-5 h-5 rounded-full animate-pulse bg-primary"></div>
      </div>
    </div>
  );
};

export default Loading;
