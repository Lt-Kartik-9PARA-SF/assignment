import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const PhotoListing = () => {
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [photosPerPage] = useState(10);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await axios.get('http://localhost:2000/api/photos');
      console.log(response);
      setPhotos(response.data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  const openModal = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  
  const totalPages = 5;

  
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);


  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div >
      <h1>Photo Listing</h1>
      <div className='box'>
      
        {currentPhotos.map((photo) => (
         <div className='box2' key={photo.id}>
            <img  src={photo.download_url} alt={photo.title} onClick={() => openModal(photo)}/>
            <p>{photo.author}</p>
          </div>
        ))}
      
      </div>
      <div>
        {pageNumbers.map((pageNumber) => (
          <button key={pageNumber} onClick={() => paginate(pageNumber)}>
            {pageNumber}
          </button>
        ))}
      </div>

      <Modal isOpen={selectedPhoto !== null} onRequestClose={closeModal}>
        {selectedPhoto && (
          <div>
            <button onClick={closeModal}>Close</button>
            <img src={selectedPhoto.download_url} alt={selectedPhoto.author} />
            <p>{selectedPhoto.author}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PhotoListing;