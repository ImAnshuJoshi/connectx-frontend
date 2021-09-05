import React, { useEffect, useState } from "react";
import "../../styles/CreatePost/create_post_image_input_wrapper_comp.css";
import CreatePostImageContainerComp from "./CreatePostImageContainerComp";
import incrementInputImageList from "./helper/inputImageListIncrementor";
import setInputImageDimensions from "./helper/imageDimensionsSetter";
import removePreviewImage from "./helper/inputPreviewImageRemover";
import CreatePostAddIcon from "../../assets/create_post/ic_add_image.svg";

function CreatePostImagesPreviewTempCompPrimary({
  defaultIputImagesList = [],
}) {
  const [inputImagesSrcList, setInputImagesSrcList] = useState(
    defaultIputImagesList
  );
  const [inputImagesFilesList, setInputImagesFilesList] = useState([]);
  const [inputImagesDimensionsList, setInputImagesDimensionsList] = useState(
    []
  );

  useEffect(() => {
    if (inputImagesSrcList.length == 0) {
      setInputImagesDimensionsList([]);
    }
  }, [inputImagesSrcList]);

  useEffect(() => {
    console.log(inputImagesDimensionsList);
  }, [inputImagesDimensionsList]);

  function setInputImageDimensionsList(filePositionIndex, width, height) {
    setInputImageDimensions(
      filePositionIndex,
      width,
      height,
      inputImagesDimensionsList,
      setInputImagesDimensionsList
    );
  }

  const removePrevieImage = (previewImageIndex) => {
    removePreviewImage(
      previewImageIndex,
      inputImagesSrcList,
      setInputImagesSrcList,
      inputImagesFilesList,
      setInputImagesFilesList,
      inputImagesDimensionsList,
      setInputImagesDimensionsList
    );
  };
  return (
    <div className="create-post-preview-images-primary-wrapper">
      <div className="create-post-preview-images-secondary-wrapper">
        {inputImagesSrcList.map((imageSrc, index) => {
          return (
            <div key={index} className="crete-post-preview-image-comp-wrapper">
              <CreatePostImageContainerComp
                previewImageIndex={index}
                addPostPreviewImageSrc={imageSrc}
                imageDimensionsUpdater={setInputImageDimensionsList}
                imageRemoverFunction={removePrevieImage}
              />
            </div>
          );
        })}
      </div>
      <div
        className="create-post-input-img-input-button-wrapper"
        onClick={(e) => {
          e.target.childNodes[0]?.click();
        }}
      >
        <input
          type="file"
          name="attachedImgs"
          accept=".png , .jpg , .jpeg "
          onChange={(e) => {
            incrementInputImageList(
              e,
              inputImagesFilesList,
              setInputImagesFilesList,
              inputImagesSrcList,
              setInputImagesSrcList
            );
          }}
          className="create-post-input-img-input-button"
        />
        <img
          src={CreatePostAddIcon}
          alt=""
          className="create-post-input-img-input-button-plus-icon"
        />
      </div>
    </div>
  );
}

export default CreatePostImagesPreviewTempCompPrimary;