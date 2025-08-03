USE [hcs];
GO

CREATE TABLE [dbo].[LabResults] (
    LabResultID INT IDENTITY(1,1) PRIMARY KEY,
    PatientID INT NOT NULL,
    MarkerName VARCHAR(50) NOT NULL,     -- e.g., CA125, PSA, CEA
    Value FLOAT NOT NULL,                -- Numeric test result
    Unit VARCHAR(10) DEFAULT 'U/mL',     -- Optional: e.g., ng/mL
    CollectedAt DATETIME NOT NULL,       -- When sample was collected
    CreatedAt DATETIME DEFAULT GETDATE(),-- When record was created
    CONSTRAINT FK_LabResults_Patients
        FOREIGN KEY (PatientID)
        REFERENCES [dbo].[Patients](PatientID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
GO

INSERT INTO [dbo].[LabResults] (PatientID, MarkerName, Value, Unit, CollectedAt)
VALUES
-- Alice Nguyen (PatientID = 1)
(1, 'CA125', 72.5, 'U/mL', '2025-08-03 09:00:00'),
(1, 'CEA', 2.1, 'ng/mL', '2025-08-01 11:20:00'),

-- Brian Thompson (PatientID = 2)
(2, 'PSA', 4.3, 'ng/mL', '2025-08-02 14:45:00'),

-- Chloe Singh (PatientID = 3)
(3, 'CA125', 19.0, 'U/mL', '2025-08-04 08:30:00'),

-- David Lee (PatientID = 4)
(4, 'CA19-9', 38.6, 'U/mL', '2025-08-05 10:10:00'),

-- Emily Chen (PatientID = 5)
(5, 'CA125', 90.2, 'U/mL', '2025-08-06 07:45:00'),
(5, 'CEA', 3.4, 'ng/mL', '2025-08-06 07:50:00');

SELECT 
  p.FirstName, 
  p.LastName, 
  l.MarkerName, 
  l.Value, 
  l.Unit, 
  l.CollectedAt
FROM [dbo].[LabResults] l
JOIN [dbo].[Patients] p ON p.PatientID = l.PatientID
ORDER BY p.LastName, l.CollectedAt;
