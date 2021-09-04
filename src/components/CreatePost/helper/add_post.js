import Cookies from "js-cookie";
import instance from "../../../helper/axios";

export const addPost = (userDetails, history, postDetails) => async (e) => {
    e.preventDefault();

    const token = Cookies.get("token");

    if (!token) {
        history.replace("/signin");
    }

    const attachedImgs = postDetails.attachedImgs;
    let isProject = false;

    console.log(attachedImgs);

    if (postDetails.typeOfPost === "Project") {
        isProject = true;
    }

    const postData = new FormData();
    postData.append("title", postDetails.postTitle);
    postData.append("description", postDetails.postDescription);
    postData.append("jobLink", postDetails.jobLink);
    postData.append("isProject", isProject);

    for (let file of attachedImgs) {
        postData.append("attachedImgs", file);
    }

    if (!postDetails.postDescription || !postDetails.typeOfPost) {
        return alert("Please fill all the details properly!");
    }

    if (!postDetails.postTitle && postDetails.typeOfPost !== "Blog") {
        return alert("Please add post title!");
    }

    if (!postDetails.jobLink && postDetails.typeOfPost === "Job") {
        return alert("Please add joblink!");
    }

    if (!userDetails.isVerified) {
        return alert("Your verification is under process!");
    }

    try {
        const addPostRes = await instance.post(`/home/addpost`, postData, {
            headers: {
                Authorization: `${token}`,
            },
        });

        if (addPostRes.status === 200) {
            history.replace("/home");
            document
                .getElementById("HomeContainerCreatePost")
                .classList.toggle("hidden");
        }

    } catch (error) {
        if (error.response.status === 500) {
            return alert(`Server error occured!`);
        }
        if (error.response.status === 408) {
            return alert(`Your verification is under process!`);
        }
        return alert(`Your session has expired, please login again!`);
    }
};