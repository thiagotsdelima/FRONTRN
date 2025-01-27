import { ButtonText } from '../../components/ButtonText'
import { api } from '../../services/api'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Textarea } from '../../components/TextArea'
import { NoteItem } from '../../components/NoteItem'
import { Section } from '../../components/Section'
import { Button } from '../../components/Button'
import { Container, Form } from './styles'

export function New() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState('')
  const [links, setLinks] = useState([])
  const [newLinks, setNewLinks] = useState('')

  const navigate = useNavigate()
  function handleBack() {
    navigate(-1)
  }

  function handleAddLink() {
    setLinks((prevState) => [...prevState, newLinks])
    setNewLinks('')
  }

  function handleRemoveLink(deleted) {
    setLinks((prevState) => prevState.filter((link) => link !== deleted))
  }

  function handleAddTag() {
    setTags((prevState) => [...prevState, newTag])
    setNewTag('')
  }

  function handleRemoveTag(deleted) {
    setTags((prevState) => prevState.filter((Tag) => Tag !== deleted))
  }

  async function handleNewNote() {
    if (!title) {
      alert('Por favor, adicione um título.')
      return
    }
    if (newLinks) {
      alert('Por favor, finalize o link pendente.')
      return
    }
    if (newTag) {
      alert('Finalize a tag pendente antes de salvar.')
      return
    }
    await api.post('/notes', {
      title,
      description,
      tags,
      links
    })
    alert('Note created successfully')
    navigate(-1)
  }

  return (
    <Container>
      <Header />
      <main>
        <Form>
          <header>
            <h1>Create note</h1>
            <ButtonText title="Back" onClick={handleBack} />
          </header>
          <Input
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="comments"
            onChange={(e) => setDescription(e.target.value)}
          />
          <Section title="Links useful">
            {links.map((link, index) => (
              <NoteItem
                key={String(index)}
                value={link}
                onClick={() => handleRemoveLink(link)}
              />
            ))}
            <NoteItem
              isNew
              placeholder="New link"
              value={newLinks}
              onChange={(e) => setNewLinks(e.target.value)}
              onClick={handleAddLink}
            />
          </Section>
          <Section title="Mandatory">
            <div className="tags">
              {tags.map((tag, index) => (
                <NoteItem
                  key={String(index)}
                  value={tag}
                  onClick={() => handleRemoveTag(tag)}
                />
              ))}
              <NoteItem
                isNew
                placeholder="New tag"
                onChange={(e) => setNewTag(e.target.value)}
                value={newTag}
                onClick={handleAddTag}
              />
            </div>
          </Section>
          <Button title="Save" onClick={handleNewNote} />
        </Form>
      </main>
    </Container>
  )
}
