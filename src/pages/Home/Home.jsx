import { useState, useEffect } from 'react';
import axios from 'axios';
import * as S from './styles';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  const [expandedCards, setExpandedCards] = useState({});
  
  const [editData, setEditData] = useState({});

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newContent, setNewContent] = useState('');

  useEffect(() => {
    axios.get('/api/posts')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (query.trim() === '') {
      setFilteredPosts(posts);
    } else {
      const q = query.toLowerCase();
      const filtered = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(q) ||
          post.content.toLowerCase().includes(q)
      );
      setFilteredPosts(filtered);
    }
  }, [posts, query]);

  const handleCardClick = (postId) => {
    setExpandedCards((prev) => ({
      ...prev,
      [postId]: {
        expanded: !prev[postId]?.expanded,
        editing: false
      }
    }));
    const post = posts.find(p => p._id === postId);
    if (post) {
      setEditData((prev) => ({
        ...prev,
        [postId]: { title: post.title, author: post.author, content: post.content }
      }));
    }
  };

  const handleDelete = (postId) => {
    axios.delete(`/api/posts/${postId}`)
      .then(() => {
        toast.success("Post excluído com sucesso!");
        setPosts((prev) => prev.filter(p => p._id !== postId));
      })
      .catch((err) => {
        console.error(err);
        toast.error("Erro ao excluir o post.");
      });
  };

  const handleEditClick = (postId) => {
    setExpandedCards((prev) => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        editing: true
      }
    }));
  };

  const handleEditChange = (postId, field, value) => {
    setEditData((prev) => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        [field]: value
      }
    }));
  };

  const handleEditSave = (postId) => {
    const { title, author, content } = editData[postId];
    axios.put(`/api/posts/${postId}`, { title, author, content })
      .then((response) => {
        toast.success("Post atualizado com sucesso!");
        setPosts((prev) => prev.map(p => p._id === postId ? response.data : p));
        setExpandedCards((prev) => ({
          ...prev,
          [postId]: {
            ...prev[postId],
            editing: false
          }
        }));
      })
      .catch((err) => {
        console.error(err);
        toast.error("Erro ao atualizar o post.");
      });
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    axios.post('/api/posts', {
      title: newTitle,
      author: newAuthor,
      content: newContent
    })
    .then((response) => {
      toast.success("Post criado com sucesso!");
      setPosts((prev) => [...prev, response.data]);
      setShowCreateModal(false);
      setNewTitle('');
      setNewAuthor('');
      setNewContent('');
    })
    .catch((err) => {
      console.error(err);
      toast.error("Erro ao criar o post.");
    });
  };

  return (
    <S.Container>
      <ToastContainer />
      {showCreateModal && (
        <S.ModalOverlay>
          <S.ModalContent>
            <S.ModalTitle>Criar Post</S.ModalTitle>
            <form onSubmit={handleCreatePost}>
              <S.ModalInput
                placeholder="Título"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <S.ModalInput
                placeholder="Autor"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
              />
              <S.ModalTextarea
                placeholder="Conteúdo"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
              <S.ModalButtonContainer>
                <S.Button type="submit">Criar</S.Button>
                <S.Button type="button" onClick={() => setShowCreateModal(false)}>
                  Cancelar
                </S.Button>
              </S.ModalButtonContainer>
            </form>
          </S.ModalContent>
        </S.ModalOverlay>
      )}

      <S.TitleContainer>
        <S.Title>Lista de Posts</S.Title>
        <S.CreateButton onClick={() => setShowCreateModal(true)}>Criar Post</S.CreateButton>
      </S.TitleContainer>
      <S.SearchInput
        type="text"
        placeholder="Buscar posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {filteredPosts.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#fff', marginTop: '20px' }}>
          Nenhum post disponível.
        </p>
      ) : (
        <S.CardList>
          {filteredPosts.map((post) => {
            const isExpanded = expandedCards[post._id]?.expanded;
            const isEditing = expandedCards[post._id]?.editing;
            const editValues = editData[post._id] || {};

            return (
              <S.CardContainer key={post._id} onClick={() => handleCardClick(post._id)}>
                <S.CardTitle>{post.title}</S.CardTitle>
                <S.CardAuthor>{post.author}</S.CardAuthor>
                {isExpanded && !isEditing && (
                  <>
                    <S.DetailContent>{post.content}</S.DetailContent>
                    <S.ButtonContainer>
                      <S.Button onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(post._id);
                      }}>Editar</S.Button>
                      <S.Button onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(post._id);
                      }}>Excluir</S.Button>
                    </S.ButtonContainer>
                  </>
                )}
                {isExpanded && isEditing && (
                  <S.EditForm onClick={(e) => e.stopPropagation()}>
                    <input
                      type="text"
                      placeholder="Título"
                      value={editValues.title || ''}
                      onChange={(e) => handleEditChange(post._id, 'title', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Autor"
                      value={editValues.author || ''}
                      onChange={(e) => handleEditChange(post._id, 'author', e.target.value)}
                    />
                    <textarea
                      placeholder="Conteúdo"
                      value={editValues.content || ''}
                      onChange={(e) => handleEditChange(post._id, 'content', e.target.value)}
                    />
                    <S.ButtonContainer>
                      <S.Button onClick={(e) => {
                        e.stopPropagation();
                        handleEditSave(post._id);
                      }}>Salvar</S.Button>
                      <S.Button onClick={(e) => {
                        e.stopPropagation();
                        setExpandedCards((prev) => ({
                          ...prev,
                          [post._id]: {
                            ...prev[post._id],
                            editing: false
                          }
                        }));
                      }}>Cancelar</S.Button>
                    </S.ButtonContainer>
                  </S.EditForm>
                )}
              </S.CardContainer>
            );
          })}
        </S.CardList>
      )}
    </S.Container>
  );
}

export default HomePage;
