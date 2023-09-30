import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

import {
  ChooseButtonsContainer,
  ChooseButton,
  Container,
  Button,
  Table,
  Th,
  Td,
  ButtonDelete,
  ButtonEdit,
  TdActions,
  TableContainer,
  StatusButton,
} from "../styles/UpdateEvent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import EditVideoPopup from "./EditVideoPopup";
import CreateVideoPopup from "./AddVideoPopup";


export const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

function UpdateVideosUrl() {
const [videos, setVideos] = useState([])
const [showEditVideoPopup, setShowEditVideoPopup] = useState(false);
const [showAddVideoPopup, setShowAddVideoPopup] = useState(false);
const [videoToEdit, setVideoToEdit] = useState({
    id: "",
    title: "",
    url: "",
});
  useEffect(() => {
    axios.get("http://back.r3mob.fr/videos").then((response) => {
        setVideos(response.data);
    });
  }, []);

function handleDeleteVideo(id) {
    axios.delete(`http://back.r3mob.fr/videos/${id}`).then((response) => {
        setVideos(
            videos.filter((video) => {
                return video.id !== id;
            })
        );
    });
}
function handleEditVideo(video){
    setVideoToEdit(video);
    setShowEditVideoPopup(true);
}
function handleSavevideoChanges(video){
    axios.put(`http://back.r3mob.fr/videos/${video.id}`, {
        title: video.title,
        url: video.url,
    }).then((response) => {
        setVideos(
            videos.map((vid) => {
                return video.id === vid.id ? response.data : vid;
            })
        );
    });
    setShowEditVideoPopup(false);
}
function handleClosevideoPopup(){
    setShowEditVideoPopup(false);
}
function handleCreateVideo(video){
    axios.post(`http://back.r3mob.fr/videos`, {
        title: video.title,
        url: video.url,
    }).then((response) => {
        setVideos([...videos, response.data]);
    });
    setShowAddVideoPopup(false);
}
function handleCloseVideoPopup(){
    setShowAddVideoPopup(false);
}

  return (
    <>
    <Button style={{
        marginTop:"25px"
    }} onClick={()=>{
        setShowAddVideoPopup(true);
    }}>Ajouter une vidéo</Button>
    <TableContainer style={{
        marginTop:"1px"
    }}>
      <Table style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <Th>Titre Vidéo</Th>
            <Th>Url Vidéo</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <tr key={video.id}>
              <Td>{video.title}</Td>
              <Td>{video.url}</Td>
              <Td
                style={{
                  border: "1px solid #ccc",
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                }}
              >
                <TdActions>
                  <ButtonEdit onClick={() => handleEditVideo(video)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </ButtonEdit>
                  <ButtonDelete onClick={() => handleDeleteVideo(video.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </ButtonDelete>
                </TdActions>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
    {showEditVideoPopup && videoToEdit && (
          <EditVideoPopup
            video={videoToEdit}
            onSave={handleSavevideoChanges}
            onClose={handleClosevideoPopup}
          />
        )}
        {showAddVideoPopup && (
          <CreateVideoPopup
            onSave={handleCreateVideo}
            onClose={handleCloseVideoPopup}
          />
        )}
    </>
    
    
  );
}

export default UpdateVideosUrl;
