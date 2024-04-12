const rootUrl = "https://nice-dogs.vercel.app/api/dogs";

export async function getAllDogs(){
    const res = await fetch(rootUrl);
    return await res.json()
}

export async function getDogBySlug (slug){
    const res = await fetch(`${rootUrl}?slug=${slug}`);
    if (res.status !== 200) return {error: "something went wrong"};
    return await res.json()
}