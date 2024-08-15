interface Phase1Props {
  telegramId: number;
}
export default function Phase1({ telegramId }: Phase1Props) {
  return (
    <>
      <h1 className="text-4xl font-semibold mt-[60px]">We are DOG Army!</h1>
      <div className="mt-[10px] text-muted-foreground text-md tracking-tight">
        You have joined Telegram
      </div>
      <div className="mt-[60px] mb-[30px]">
        <div className="text-[220px] leading-[180px] font-semibold">0</div>
        <div className="text-4xl font-semibold mt-[10px]">years ago</div>
        <div className="text-base mt-[59px] tracking-tight">
          Your account number is #{telegramId}. <br />
          {"You're in the Top 90% Telegram users"}
        </div>
      </div>
    </>
  );
}
