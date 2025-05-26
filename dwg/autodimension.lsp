(defun c:AutoDimension ()
  (setq ss (ssget)) ;; Get user selection
  (if ss
    (progn
      (setq i 0)
      (repeat (sslength ss)
        (setq ent (ssname ss i))
        (setq obj (entget ent))
        (if (or (equal (cdr (assoc 0 obj)) "LINE") 
                (equal (cdr (assoc 0 obj)) "LWPOLYLINE"))
          (command "_DIMLINEAR" ent " ") ;; Auto-dimension lines
          (if (equal (cdr (assoc 0 obj)) "CIRCLE")
            (command "_DIMDIAMETER" ent " ") ;; Auto-dimension circles
          )
        )
        (setq i (1+ i))
      )
    )
    (princ "No objects selected.")
  )
  (princ)
)