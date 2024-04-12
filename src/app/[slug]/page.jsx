import { notFound } from "next/navigation";
import { getDogBySlug, getAllDogs } from "@/lib/dogApi";

// [slug]/page.js
export async function generateStaticParams() {
    //const res = await fetch("https://nice-dogs.vercel.app/api/dogs")
    const pages = await getAllDogs()
    const paths = pages.map((page) => {
      return { slug: page.slug };
    });
    
    return paths;
  }

  export async function generateMetadata({params}) {
    const { slug } = params;
    const data = await getDogBySlug(slug);


    //const url = `https://nice-dogs.vercel.app/api/dogs?slug=${slug}`;
    //const res = await fetch(url);
    //if (res.status !== 200) return notFound();
    //const data = await res.json();
  
    return {
      title: data.name,
      description: `Here is ${data.name} `,
    };
  }

export default async function DogPage({ params }) {
  const { slug } = params;

  const url = `https://nice-dogs.vercel.app/api/dogs?slug=${slug}`;
  const res = await fetch(url);

  if (res.status !== 200) return notFound();

  const data = await res.json();
  console.log(data);

  return (
    <main>
      <h1>{data.name}</h1>
      {data.favouriteColor && <p>{data.name} elsker {data.favouriteColor}</p>}
      <p>{data.name} is {data.age} {data.age == "1" ? "years" : "years"} old</p>
    <img src={data.image.url} alt="A cute dog" />
    </main>
  );
}


