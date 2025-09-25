
import { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, Checkbox, FormControlLabel, Grid } from '@mui/material';
import styles from './MovieFormModal.module.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 800, 
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  maxHeight: '90vh',
  overflowY: 'auto'
};

function MovieFormModal({ isOpen, onClose, onSave, movie, categories }) {
  const [formData, setFormData] = useState({
    nomeFilme: '', sinopse: '', dataLancamento: '', precoCompra: '',
    qtdEstoque: '', disponivelLocacao: false, classificacaoIndicativa: '',
    imagem: '', categoria_idcategoria: ''
  });

  useEffect(() => {
    if (movie) {
      setFormData({
        ...movie,
        dataLancamento: new Date(movie.dataLancamento).toISOString().split('T')[0]
      });
    } else {
      setFormData({
        nomeFilme: '', sinopse: '', dataLancamento: '', precoCompra: '',
        qtdEstoque: '', disponivelLocacao: false, classificacaoIndicativa: '',
        imagem: '', categoria_idcategoria: ''
      });
    }
  }, [movie]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
          {movie ? 'Editar Filme' : 'Adicionar Novo Filme'}
        </Typography>

        <Grid container spacing={4}>

          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField name="nomeFilme" label="Título" value={formData.nomeFilme} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12}>
                <TextField name="imagem" label="URL da Imagem do Poster" value={formData.imagem} onChange={handleChange} fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField name="sinopse" label="Sinopse" value={formData.sinopse} onChange={handleChange} multiline rows={4} fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField name="categoria_idcategoria" label="Categoria" value={formData.categoria_idcategoria} onChange={handleChange} select SelectProps={{ native: true }} fullWidth required>
                  <option value=""></option>
                  {categories.map(cat => <option key={cat.idcategoria} value={cat.idcategoria}>{cat.nome}</option>)}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField name="dataLancamento" label="Data de Lançamento" type="date" value={formData.dataLancamento} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField name="precoCompra" label="Preço de Compra" type="number" value={formData.precoCompra} onChange={handleChange} fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField name="qtdEstoque" label="Quantidade em Estoque" type="number" value={formData.qtdEstoque} onChange={handleChange} fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField name="classificacaoIndicativa" label="Classificação Indicativa" value={formData.classificacaoIndicativa} onChange={handleChange} fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel control={<Checkbox name="disponivelLocacao" checked={formData.disponivelLocacao} onChange={handleChange} />} label="Disponível para Locação" />
              </Grid>
              <Grid item xs={12} md={4}>
                <div className={styles.posterContainer}>
                  {formData.imagem ? (
                    <img src={formData.imagem} alt="Preview do poster" className={styles.posterImage} />
                  ) : (
                    <div className={styles.posterPlaceholder}>Preview do Poster</div>
                  )}
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">Salvar</Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default MovieFormModal;

