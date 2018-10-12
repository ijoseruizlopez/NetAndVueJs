using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;

namespace LibertadIncluit.Logger
{
    public interface ILogger
    {


        void LogException(Exception exception);
        void LogError(int pUserLog, string pFecha, string pMetodo, string pExcepction, string pTipoError);
        void LogWarning(string pUserLog, string pFecha, string pException);
        void LogInfo(string pUserLog, DateTime pFecha, string pException, string pMetodo);


        #region --- Migrado desde MOOC ---
        void initLog(string cEventSource);
        System.Collections.ICollection initFromService();
        log4net.ILog GetLogger(string LoggerName);
        void Debug(string message);
        void Error(string message);
        void Warning(string message);
        void Information(string message);
        void Exception(Exception exception);
        void Message(string message, EventLogEntryType severity, int eventId);
        void Message(string message, EventLogEntryType severity, int eventId, int skipStackLevels);
        void Exception(Exception exception, EventLogEntryType defaultSeverity);
        #endregion --- Migrado desde MOOC ---
    }
}