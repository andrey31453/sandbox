import sandboxes_json from '../../sandboxes'
const { sandboxes } = sandboxes_json

{
  const add_sandbox_links = () => {
    const sandbox_links = document.getElementsByClassName('sandbox_links')[0]
    if (!sandbox_links) return

    sandboxes.forEach((sandbox) => {
      const sandbox_link = document.createElement('a')
      sandbox_link.textContent = sandbox
      sandbox_link.href = `${sandbox}.html`
      sandbox_links.appendChild(sandbox_link)
    })
  }

  add_sandbox_links()
}
