interface SectionProps {
  title: string;
  condition: boolean;
  fallbackMessage: string;
  children: React.ReactNode;
}

export default function Section({ title, condition, fallbackMessage, children }: SectionProps) {
  return (
    <>
      <hr className="my-8 opacity-15" />
      <h2 className="text-xl font-semibold text-text-primary mb-4">{title}</h2>

      {condition ? <div>{children}</div> : <p className="text-gray-400">{fallbackMessage}</p>}
    </>
  );
}
