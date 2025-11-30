export async function uploadImage(name,file){
    const formData= new FormData();
    FormData.append("image", file);

    const res= await fetch(
            `http://localhost:3001/api/upload?name=${name}`,
            {
                method:"POST",
                body:FormData
            }
    );
    return await res.json();
}