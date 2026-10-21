import { useCallback, useEffect, useState } from 'react'
export default function useFetch(url) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [revision, setRevision] = useState(0)
  const reload = useCallback(() => setRevision(n => n + 1), [])
  useEffect(() => {
    const controller = new AbortController()
    setData([])
    setError('')
    if (!url) { setLoading(false); return }
    setLoading(true)
    fetch(url, { signal: controller.signal }).then(async response => {
      if (!response.ok) throw new Error(`Không tải được dữ liệu (${response.status})`)
      const source = await response.json()
      const saved = url === '/data/students.json' ? localStorage.getItem('student-local-data') : null
      const result = saved ? JSON.parse(saved) : source
      if (!Array.isArray(result)) throw new Error('Resource phải trả về danh sách sinh viên')
      if (!controller.signal.aborted) setData(result)
    }).catch(e => { if (!controller.signal.aborted) setError(e.message) })
      .finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [url, revision])
  return { data, loading, error, reload }
}
