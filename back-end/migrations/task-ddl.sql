CREATE TABLE IF NOT EXISTS Task (
  TaskId int(10) unsigned NOT NULL AUTO_INCREMENT,
  Description VARCHAR (255) NOT NULL,
  Owner VARCHAR (255) NOT NULL,
  DtDue datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ProjectId int(10) unsigned NOT NULL,
  Checked bit NOT NULL,
  PRIMARY KEY (TaskId),
  KEY FK_Task_Project (ProjectId),
  CONSTRAINT FK_Task_Project FOREIGN KEY (ProjectId) REFERENCES Project (ProjectId)
) ENGINE=InnoDB;
