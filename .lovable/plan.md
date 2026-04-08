
## 1. Fix photo rendering in diary entries
- In `DiaryView.tsx`, the photo is rendered via `picsum.photos/seed/...` but now we store blob URLs from file uploads
- Fix: render `entry.photo` directly as `src` if it starts with `blob:` or `data:`, otherwise fallback to picsum

## 2. Add delete/edit capabilities to the store
- `deleteItinerary(id)` — remove an itinerary
- `deleteDiary(id)` — remove a diary
- `deleteDiaryEntry(diaryId, entryId)` — remove a single diary entry
- `unsaveDestination(id)` — already exists as `toggleSaveDestination`

## 3. Update Itineraries page with delete
- Add delete button on each itinerary card with confirmation dialog

## 4. Update Diaries page with delete  
- Add delete button on each diary card with confirmation dialog

## 5. Update DiaryView with entry delete
- Add delete button on each diary entry

## 6. Update Matches page — allow removing a match
- Add an unsave/remove button on each matched destination card

## Files changed
- `src/store/useStore.ts` — add `deleteItinerary`, `deleteDiary`, `deleteDiaryEntry`
- `src/pages/DiaryView.tsx` — fix photo src, add entry delete
- `src/pages/Itineraries.tsx` — add delete button
- `src/pages/Diaries.tsx` — add delete button
- `src/pages/Matches.tsx` — add remove/unsave button
