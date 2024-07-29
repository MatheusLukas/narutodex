import Image from "next/image";

type Props = {
  title: string;
  image: string;
};

export function Card({ title, image }: Props) {
  return (
    <div className="h-60 w-80 md:w-96 md:h-80 relative">
      <Image
        className="object-cover w-full h-full rounded-xl brightness-[0.3]"
        src={image}
        alt={title}
        width={1920}
        height={1080}
        draggable={false}
      />

      <p className="text-3xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent  whitespace-nowrap absolute translate-x-1/2 right-1/2 bottom-5">
        {title}
      </p>

      <Image
        key={title}
        src="/kunai-Minato.png"
        alt="Naruto"
        width={100}
        height={100}
        className="invisible group-hover:visible absolute bottom-2 right-72 group-hover:animate-fade-right"
      />
    </div>
  );
}
