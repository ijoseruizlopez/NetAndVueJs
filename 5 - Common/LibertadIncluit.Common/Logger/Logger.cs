using log4net.Config;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;

namespace LibertadIncluit.Logger
{
    public class Logger : ILogger
    {
        public static  Logger _log;

        private Logger()
        {
  
        }

        public static Logger getLooger()
        {
            if (_log == null)
                return new Logger();
            else
               return _log;
        }

        public void LogException(Exception exception)
        {
            throw new NotImplementedException();
        }

        public void LogWarning(string pUserLog, string pFecha, string pException)
        {
            throw new NotImplementedException();
        }

        public void LogInfo(string pUserLog, DateTime pFecha, string pException, string pMetodo)
        {
            log.Info("Usuario---" + pUserLog + "Fecha---" + pFecha + "---Excepción---" + pException + "---Método---" + pMetodo);
        }

        public void LogError(int pUserLog, string pFecha, string pMetodo, string pExcepction, string pTipoError)
        {
            throw new NotImplementedException();
        }

        public static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        public void initLog(string cEventSource)
        {
            XmlConfigurator.Configure();
        }

        public ICollection initFromService()
        {
            ICollection result = log4net.Config.XmlConfigurator.Configure();
            return result;
        }

        public log4net.ILog GetLogger(string LoggerName)
        {
            return log4net.LogManager.GetLogger(LoggerName);
        }

        public void Debug(string message)
        {
            log.Debug(message);
        }

        public void Error(string message)
        {
            log.Error(message);
        }

        public void Warning(string message)
        {
            log.Warn(message);
        }

        public void Information(string message)
        {
            log.Info(message);
        }

        public void Exception(Exception exception)
        {
            log.Error(exception.Message, exception);
        }

        public void Message(string message, EventLogEntryType severity, int eventId)
        {
            switch (severity)
            {
                case EventLogEntryType.Error:
                    log.Error(message);
                    break;
                case EventLogEntryType.Information:
                    log.Info(message);
                    break;
                case EventLogEntryType.Warning:
                    log.Warn(message);
                    break;
                case EventLogEntryType.FailureAudit:
                    log.Error(message);
                    break;
                case EventLogEntryType.SuccessAudit:
                    log.Error(message);
                    break;
                default:
                    log.Fatal(message);
                    break;
            }
        }

        public void Message(string message, EventLogEntryType severity, int eventId, int skipStackLevels)
        {
            //Message(message, severity, eventId, 0);
            Message(message, severity, eventId);
        }

        public void Exception(Exception exception, EventLogEntryType defaultSeverity)
        {
            log.Error(exception.Message, exception);
        }
    }
}