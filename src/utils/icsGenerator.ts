import { Contact } from './csvParser'

export interface CalendarResult {
  content: string
  contactsProcessed: number
}

function parseBirthdayDate(birthdayStr: string): Date | null {
  try {
    if (birthdayStr.length === 10 && birthdayStr.includes('-')) {
      return new Date(birthdayStr)
    } else if (birthdayStr.startsWith('--') && birthdayStr.length === 7) {
      const monthDay = birthdayStr.substring(2)
      const currentYear = new Date().getFullYear()
      return new Date(`${currentYear}-${monthDay}`)
    }
  } catch {
    return null
  }
  return null
}

function createBirthdayEvent(contact: Contact, birthdayDate: Date): string[] {
  const eventUid = crypto.randomUUID()
  const eventDate = birthdayDate.toISOString().split('T')[0].replace(/-/g, '')
  const timestamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  
  return [
    'BEGIN:VEVENT',
    `UID:${eventUid}`,
    `DTSTART;VALUE=DATE:${eventDate}`,
    `DTEND;VALUE=DATE:${eventDate}`,
    `SUMMARY:🎂 ${contact.fullName}'s Birthday`,
    `DESCRIPTION:Birthday of ${contact.fullName} - Remember to call and congratulate!`,
    'RRULE:FREQ=YEARLY',
    'TRANSP:TRANSPARENT',
    'CLASS:PUBLIC',
    `DTSTAMP:${timestamp}`,
    'BEGIN:VALARM',
    'TRIGGER:PT0S',
    'ACTION:EMAIL',
    `SUMMARY:Today is ${contact.fullName}'s Birthday! 🎂`,
    `DESCRIPTION:Don't forget to call ${contact.fullName} today to wish them a happy birthday! 🎂`,
    'END:VALARM',
    'BEGIN:VALARM',
    'TRIGGER:PT0S',
    'ACTION:DISPLAY',
    `SUMMARY:🎂 ${contact.fullName}'s Birthday!`,
    `DESCRIPTION:Don't forget to call ${contact.fullName} today to wish them a happy birthday! 🎂`,
    'END:VALARM',
    'END:VEVENT'
  ]
}

export function createICS(contacts: Contact[]): CalendarResult {
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Google Birthday Liberator//Birthday Events//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH'
  ]
  
  let contactsProcessed = 0
  
  for (const contact of contacts) {
    const birthdayDate = parseBirthdayDate(contact.birthday)
    
    if (birthdayDate && !isNaN(birthdayDate.getTime())) {
      const eventLines = createBirthdayEvent(contact, birthdayDate)
      icsContent.push(...eventLines)
      contactsProcessed++
    } else {
      console.warn(`Skipping ${contact.fullName} - invalid birthday format: ${contact.birthday}`)
    }
  }
  
  icsContent.push('END:VCALENDAR')
  
  return {
    content: icsContent.join('\n'),
    contactsProcessed
  }
}