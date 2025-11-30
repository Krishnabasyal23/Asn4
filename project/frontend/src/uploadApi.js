export async function uploadImage(name,file){
    const formData= new FormData();
    formData.append("image", file);

    const res= await fetch(
            `http://localhost:3001/api/upload?name=${name}`,
            {
                method:"POST",
                body:formData
            }
    );
    return await res.json();
}