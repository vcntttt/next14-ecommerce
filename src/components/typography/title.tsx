import { titleFont } from "./fonts";

interface Props {
  title: string;
  subtitle?: string;
  className?: string;
}

export const Title = ({ title, subtitle }: Props) => {
  return (
    <div className={`my-5`}>
      <h1
        className={`antialiased ${titleFont} text-4xl font-semibold mt-4 mb-2`}
      >
        {title}
      </h1>

      {subtitle && <h3 className="text-xl">{subtitle}</h3>}
    </div>
  );
};
