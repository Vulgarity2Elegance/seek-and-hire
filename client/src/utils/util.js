

export function getRedirectPath({type, avatar}) {
  let url = (type === 'hirer') ? '/hirer' : '/seeker'
  if (!avatar) {
    url += 'info'
  }
  return url
}
