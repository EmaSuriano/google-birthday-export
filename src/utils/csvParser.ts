export interface Contact {
  firstName: string
  middleName: string
  lastName: string
  birthday: string
  fullName: string
}

export function parseCSV(text: string): string[][] {
  const lines = text.split('\n')
  const result: string[][] = []
  
  for (const line of lines) {
    if (line.trim() === '') continue
    
    const row: string[] = []
    let current = ''
    let inQuotes = false
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"'
          i++
        } else {
          inQuotes = !inQuotes
        }
      } else if (char === ',' && !inQuotes) {
        row.push(current)
        current = ''
      } else {
        current += char
      }
    }
    
    row.push(current)
    result.push(row)
  }
  
  return result
}

export function extractContacts(csvData: string[][]): Contact[] {
  if (csvData.length === 0) {
    throw new Error('CSV file appears to be empty')
  }

  const header = csvData[0]
  const rows = csvData.slice(1)
  
  const firstNameIdx = header.indexOf('First Name')
  const middleNameIdx = header.indexOf('Middle Name')
  const lastNameIdx = header.indexOf('Last Name')
  const birthdayIdx = header.indexOf('Birthday')
  
  if (birthdayIdx === -1) {
    throw new Error('Birthday column not found in CSV')
  }
  
  const contacts: Contact[] = []
  
  for (const row of rows) {
    if (row.length > birthdayIdx && row[birthdayIdx]?.trim()) {
      const firstName = row[firstNameIdx]?.trim() || ''
      const middleName = row[middleNameIdx]?.trim() || ''
      const lastName = row[lastNameIdx]?.trim() || ''
      
      const nameParts = [firstName, middleName, lastName].filter(Boolean)
      const fullName = nameParts.join(' ')
      
      if (fullName) {
        contacts.push({
          firstName,
          middleName,
          lastName,
          birthday: row[birthdayIdx].trim(),
          fullName
        })
      }
    }
  }
  
  return contacts
}