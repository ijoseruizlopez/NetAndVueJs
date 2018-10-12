create or replace PACKAGE BODY LI_PKG_ARTICULO_CONSULTA IS

  PROCEDURE P_BUSCAR_ARTICULO_DESCRIPCION(p_sucursal      IN NUMBER,
                                          p_desc_articulo IN VARCHAR2,
                                          c_articulo      OUT SYS_REFCURSOR) IS
  BEGIN
    OPEN c_articulo FOR
      SELECT DISTINCT EST.ARTCEXR    AS CodigoArticulo,
             ART.ARCCODE    AS CodEAN,
             descr.TSOBDESC AS Descripcion
      FROM   central.ARTRAC EST
             INNER JOIN central.ARTUC sur ON EST.ARTCINR = sur.ARACINR
                                         AND sur.ARADFIN > SYSDATE
             INNER JOIN central.RESREL res ON sur.ARASITE = res.RELID
                                          AND res.RELDFIN > SYSDATE
                                          AND res.RELPERE IN ('92', '99', '100', '101')
             INNER JOIN central.SITCLIREL SIT ON res.RELID = SIT.SCLSITE
                                             AND SIT.SCLDFIN > SYSDATE
             INNER JOIN central.TRA_STRUCOBJ descr ON EST.ARTCINR = descr.TSOBCINT
                                                  AND descr.LANGUE = 'SP'
             INNER JOIN central.ARTCOCA ART ON EST.ARTCINR = ART.ARCCINR
                                           AND ART.ARCDFIN > SYSDATE
                                           AND ART.ARCIETI = 1
      WHERE  descr.TSOBDESC LIKE UPPER('%' || p_desc_articulo || '%')
             AND SIT.SCLSITE = p_sucursal
             AND ROWNUM <= 26
      ORDER  BY TO_NUMBER(est.ARTCEXR) ASC;
  END P_BUSCAR_ARTICULO_DESCRIPCION;

  PROCEDURE P_BUSCAR_DATOS_GENERALES(p_sucursal       IN NUMBER,
                                     p_CodigoArticulo IN VARCHAR2,
                                     c_datosArticulo  OUT SYS_REFCURSOR) IS
  BEGIN
  
    OPEN c_datosArticulo FOR
      SELECT DISTINCT EST.ARTCEXR                                         AS CodigoArticulo,
             li_central.LI_GETDESCRIPCION_ART('cexr', EST.ARTCEXR)        AS Descripcion,
             det.TPARLIBL                                                 AS Estado,
             atri.TATTLIBL                                                AS ClasificacionSurtido,
             pre.PRE_PRELIS                                               AS PrecioVigente,
             LI_DES_STOCAPA_CEXR(EST.ARTCEXR, p_sucursal)                 AS Stock,
             DECODE(ASITE.SITLIEN, 0, 'FS', 1, 'SI')                      AS HabilitadoParaVenta,
             TRA.TPARLIBC                                                 AS UnidadMedida,
             ARTU.arulong                                                 AS Ancho,
             ARTU.arularg                                                 AS Largo,
             ARTU.aruhaut                                                 AS Altura,
             ARTU.arupbru                                                 AS Peso,
             STO.smvxqte                                                  AS StockEnTransito,
             TO_CHAR(TO_DATE(STO.smvdexp, 'DD/MM/YYYY'))                  AS FechaDeEnvio,
             GET_PRECIO_VIGENTE('CEXR', est.ARTCEXR, p_sucursal, SYSDATE) AS PrecioVigente,
             GET_TIPO_PRECIO_VIGENTE('CEXR', est.ARTCEXR, p_sucursal, SYSDATE) AS TipoPrecio,
             TO_CHAR(GET_FECHA_VIGENCIA('CEXR', est.ARTCEXR, p_sucursal, SYSDATE), 'DD/MM/YYYY') AS FechaUltimaModificacion
      FROM   central.ARTRAC EST
             INNER JOIN artul ARTU ON ARTU.arucinr = EST.artcinr
                                  AND ARTU.arutypul = 1
             INNER JOIN central.ARTUC sur ON EST.ARTCINR = sur.ARACINR
                                         AND sur.ARADFIN > SYSDATE
             INNER JOIN central.TRA_PARPOSTES det ON EST.ARTETAT = det.TPARPOST
                                                 AND det.TPARTABL = 955
                                                 AND det.LANGUE = 'SP'
                                                 AND det.tparcmag = 0
             INNER JOIN central.ARTATTRI surt ON EST.ARTCINR = surt.AATCINR
                                             AND surt.AATCCLA = '20'
                                             AND surt.AATDFIN > SYSDATE
             INNER JOIN central.TRA_ATTRIVAL atri ON surt.AATCCLA = atri.TATTCCLA
                                                 AND surt.AATCATT = atri.TATTCODE
                                                 AND atri.LANGUE = 'SP'
             INNER JOIN central.FOUDGENE prov ON sur.ARACFIN = prov.FOUCFIN
             INNER JOIN central.ARTCOCA art ON sur.ARACINR = art.ARCCINR
                                           --AND art.ARCIETI = 1
                                           AND art.ARCDFIN > SYSDATE
             INNER JOIN central.RESREL res ON sur.ARASITE = res.RELID
                                          AND res.RELDFIN > SYSDATE
                                          AND res.RELPERE IN ('92', '99', '100', '101')
             INNER JOIN central.ARTSITE asite ON art.ARCCINV = asite.SITCINV
                                             AND res.RELID = asite.SITSITE
             INNER JOIN li_central.LI_DES_PRECIOS pre ON art.ARCCINR = pre.PRE_ARTCINT
                                                     AND asite.SITSITE = pre.PRE_SITIO
             INNER JOIN central.SITCLIREL SIT ON res.RELID = SIT.SCLSITE
                                             AND SIT.SCLDFIN > SYSDATE
             INNER JOIN central.CLIADRES DES ON sit.SCLSITE = DES.ADRNCLI
             INNER JOIN li_central.PARSOCPV SUC ON DES.ADRNCLI = SUC.SOCNPV
             INNER JOIN central.TRA_PARPOSTES TRA ON EST.ARTUSTK = TRA.TPARPOST
                                                 AND TRA.LANGUE = 'SP'
                                                 AND TRA.TPARCMAG = 10
                                                 AND TRA.tpartabl = 1035
             LEFT JOIN CENTRAL.STOMAVOY STO ON STO.smvcinr = EST.artcinr
                                           AND STO.smvdrec IS NULL
                                           AND STO.smvqrec = 0
                                           AND (STO.smvsiteo = 508 OR STO.smvsiteo = 308)
                                           AND STO.smvsited = p_sucursal
      WHERE  est.ARTETAT IN (1, 5)
             AND (est.ARTCEXR = p_CodigoArticulo OR LPAD(art.ARCCODE, 13, '0') = LPAD(p_CodigoArticulo, 13, '0'))
             AND SIT.SCLSITE = p_sucursal;
  END P_BUSCAR_DATOS_GENERALES;

  PROCEDURE P_BUSCAR_EANS(p_sucursal       IN NUMBER,
                          p_CodigoArticulo IN VARCHAR2,
                          c_datosEAN       OUT SYS_REFCURSOR) IS
  BEGIN
    OPEN c_datosEAN FOR
      SELECT ARCCODE                                AS Ean,
             DECODE(art.ARCIETI, 1, art.ARCIETI, 0) AS ActivoInt
      FROM   central.ARTCOCA art
             INNER JOIN central.ARTRAC est ON art.ARCCINR = est.ARTCINR
                                          AND art.ARCDFIN > SYSDATE
      WHERE  est.ARTCEXR = p_CodigoArticulo
      AND ROWNUM <= 6
      ORDER  BY art.ARCIETI DESC;
  END P_BUSCAR_EANS;

  PROCEDURE P_BUSCAR_DATOS_ESTADISTICO(p_CodigoArticulo   IN VARCHAR2,
                                       p_TipoEstadistico  IN VARCHAR2,
                                       c_datosEstadistico OUT SYS_REFCURSOR) IS
  BEGIN
    CASE p_TipoEstadistico
      --GRUPO
      WHEN 1 THEN
        OPEN c_datosEstadistico FOR
          SELECT PRENIV1 AS Id, PRELIBC AS Descripcion
          FROM   PARSTRU1
          WHERE  PRENIV1 =
                 central.W_VER_ESTRUC(p_CodigoArticulo, SYSDATE, 1)
                 AND PRENMAG = 0;
      --SECTOR
      WHEN 2 THEN
        OPEN c_datosEstadistico FOR
          SELECT DEUNIV2 AS Id, DEULIBC AS Descripcion
          FROM   PARSTRU2
          WHERE  DEUNIV1 = central.W_VER_ESTRUC(p_CodigoArticulo, SYSDATE, 1) AND
                 DEUNIV2 = SUBSTR(central.W_VER_ESTRUC(p_CodigoArticulo, SYSDATE, 2), -4) AND
                 DEUNMAG = 0;
      --FAMILIA   
      WHEN 3 THEN
        OPEN c_datosEstadistico FOR
          SELECT TRONIV3 AS Id, TROLIBC AS Descripcion
          FROM   PARSTRU3
          WHERE  TRONIV1 = central.W_VER_ESTRUC(p_CodigoArticulo, SYSDATE, 1) AND
                 TRONIV2 = SUBSTR(central.W_VER_ESTRUC(p_CodigoArticulo, SYSDATE, 2), -4) AND
                 TRONIV3 = SUBSTR(central.W_VER_ESTRUC(p_CodigoArticulo, SYSDATE, 3), -4) AND
                 TRONMAG = 0;
      --SUBFAMILIA   
      WHEN 4 THEN
        OPEN c_datosEstadistico FOR
          SELECT QUANIV4 AS Id, QUALIBC AS Descripcion
          FROM   PARSTRU4
          WHERE  QUANIV1 = central.W_VER_ESTRUC(p_CodigoArticulo, SYSDATE, 1) AND
                 QUANIV2 = SUBSTR(central.W_VER_ESTRUC(p_CodigoArticulo, SYSDATE, 2), -4) AND
                 QUANIV3 = SUBSTR(central.W_VER_ESTRUC(p_CodigoArticulo, SYSDATE, 3), -4) AND
                 QUANIV4 = SUBSTR(central.W_VER_ESTRUC(p_CodigoArticulo, SYSDATE, 4), -4) AND
                 QUANMAG = 0;
      --Categoria   
      WHEN 5 THEN
        OPEN c_datosEstadistico FOR
          SELECT CINNIV5 AS Id, CINLIBC AS Descripcion
          FROM   PARSTRU5
          WHERE  CINNIV1 = central.W_VER_ESTRUC(p_CodigoArticulo, SYSDATE, 1) AND
                 CINNIV2 = SUBSTR(central.W_VER_ESTRUC(p_CodigoArticulo, SYSDATE, 2), -4) AND
                 CINNIV3 = SUBSTR(central.W_VER_ESTRUC(p_CodigoArticulo, SYSDATE, 3), -4) AND
                 CINNIV4 = SUBSTR(central.W_VER_ESTRUC(p_CodigoArticulo, SYSDATE, 4), -4) AND
                 CINNIV5 = SUBSTR(central.W_VER_ESTRUC(p_CodigoArticulo, SYSDATE, 5), -4) AND
                 CINNMAG = 0;
      --SubCategoria   
      WHEN 6 THEN
        OPEN c_datosEstadistico FOR
          SELECT SIXNIV6 AS Id, SIXLIBC AS Descripcion
          FROM   PARSTRU6
          WHERE  SIXNIV1 = central.W_VER_ESTRUC(p_CodigoArticulo, SYSDATE, 1) AND
                 SIXNIV2 = SUBSTR(central.W_VER_ESTRUC(p_CodigoArticulo, SYSDATE, 2), -4) AND
                 SIXNIV3 = SUBSTR(central.W_VER_ESTRUC(p_CodigoArticulo, SYSDATE, 3), -4) AND
                 SIXNIV4 = SUBSTR(central.W_VER_ESTRUC(p_CodigoArticulo, SYSDATE, 4), -4) AND
                 SIXNIV5 = SUBSTR(central.W_VER_ESTRUC(p_CodigoArticulo, SYSDATE, 5), -4) AND
                 SIXNIV6 = SUBSTR(central.W_VER_ESTRUC(p_CodigoArticulo, SYSDATE, 6), -4) AND
                 SIXNMAG = 0;
      ELSE
        dbms_output.put_line('No such grade');
    END CASE;
  END P_BUSCAR_DATOS_ESTADISTICO;
  
  FUNCTION GET_PRECIO_VIGENTE(p_tipo_articulo IN VARCHAR2,
                              p_codigo        IN NUMBER,
                              p_sucursal      IN NUMBER,
                              p_fecha         IN DATE) RETURN NUMBER IS
    v_precio_vigente NUMBER := 0;
  BEGIN
    IF UPPER(p_tipo_articulo) = li_pkg_articulo_consulta.C_TIPO_ART_CEXR THEN
      SELECT CASE
               WHEN pr.PRE_OFEDESFEC IS NOT NULL AND pr.PRE_OFEHASFEC IS NOT NULL AND
                    TRUNC(NVL(p_fecha, SYSDATE)) BETWEEN pr.PRE_OFEDESFEC AND pr.PRE_OFEHASFEC THEN
                 pr.PRE_PREOFE
               WHEN pr.PRE_SUCDESFEC IS NOT NULL AND pr.PRE_SUCHASFEC IS NOT NULL AND
                    TRUNC(NVL(p_fecha, SYSDATE)) BETWEEN pr.PRE_SUCDESFEC AND pr.PRE_SUCHASFEC THEN
                 pr.PRE_PRESUC
               ELSE
                 pr.PRE_PRELIS
             END AS PRECIO_VIGENTE
      INTO   v_precio_vigente
      FROM   li_central.LI_DES_PRECIOS pr
      WHERE  pr.PRE_SITIO    = p_sucursal AND
             pr.PRE_ARTEAN13 = p_codigo;
    END IF;
    
    IF UPPER(p_tipo_articulo) = li_pkg_articulo_consulta.C_TIPO_ART_CINT THEN
      SELECT CASE
               WHEN pr.PRE_OFEDESFEC IS NOT NULL AND pr.PRE_OFEHASFEC IS NOT NULL AND
                    TRUNC(p_fecha) BETWEEN pr.PRE_OFEDESFEC AND pr.PRE_OFEHASFEC THEN
                 pr.PRE_PREOFE
               WHEN pr.PRE_SUCDESFEC IS NOT NULL AND pr.PRE_SUCHASFEC IS NOT NULL AND
                    TRUNC(p_fecha) BETWEEN pr.PRE_SUCDESFEC AND pr.PRE_SUCHASFEC THEN
                 pr.PRE_PRESUC
               ELSE
                 pr.PRE_PRELIS
             END AS PRECIO_VIGENTE
      INTO   v_precio_vigente
      FROM   li_central.LI_DES_PRECIOS pr
      WHERE  pr.PRE_SITIO   = p_sucursal AND
             pr.PRE_ARTCINT = p_codigo;
    END IF;
    
    RETURN v_precio_vigente;
  EXCEPTION
    WHEN OTHERS THEN
	    RETURN 0;
  END GET_PRECIO_VIGENTE;
  
  FUNCTION GET_PRECIO_ANTERIOR(p_tipo_articulo IN VARCHAR2,
                               p_codigo        IN NUMBER,
                               p_sucursal      IN NUMBER) RETURN NUMBER IS
    v_precio_anterior NUMBER := 0;
  BEGIN
    IF UPPER(p_tipo_articulo) = li_pkg_articulo_consulta.C_TIPO_ART_CEXR THEN
      SELECT t.CAMH_PRECIO_ANT
      INTO   v_precio_anterior
      FROM   (
              SELECT camh_precio_ant
              FROM   li_central.LI_DES_CAMBIOS_PRE_HIS ph
              WHERE  ph.CAMH_SITIO    = p_sucursal
                     AND ph.CAMH_CEXR = p_codigo
              ORDER  BY ph.CAMH_FECHA DESC
             ) t
      WHERE  ROWNUM = 1;
    END IF;
    
    IF UPPER(p_tipo_articulo) = li_pkg_articulo_consulta.C_TIPO_ART_CINT THEN
      SELECT t.CAMH_PRECIO_ANT
      INTO   v_precio_anterior
      FROM   (
              SELECT ph.*
              FROM   li_central.LI_DES_PRECIOS pr
                     INNER JOIN li_central.LI_DES_CAMBIOS_PRE_HIS ph ON pr.PRE_ARTEAN13 = ph.CAMH_CEXR
                                                                    AND pr.PRE_SITIO = ph.CAMH_SITIO
              WHERE  pr.PRE_SITIO   = p_sucursal AND
                     pr.PRE_ARTCINT = p_codigo
              ORDER  BY ph.CAMH_FECHA DESC
             ) t
      WHERE  ROWNUM = 1;
    END IF;
    
    RETURN v_precio_anterior;
  EXCEPTION
    WHEN OTHERS THEN
	    RETURN 0;
  END GET_PRECIO_ANTERIOR;
    
  FUNCTION GET_FECHA_VIGENCIA(p_tipo_articulo IN VARCHAR2,
                              p_codigo        IN NUMBER,
                              p_sucursal      IN NUMBER,
                              p_fecha         IN DATE) RETURN DATE IS
    v_fecha_vigencia DATE := TRUNC(SYSDATE);
  BEGIN
    IF UPPER(p_tipo_articulo) = li_pkg_articulo_consulta.C_TIPO_ART_CEXR THEN
      SELECT CASE
               WHEN pr.PRE_OFEDESFEC IS NOT NULL AND pr.PRE_OFEHASFEC IS NOT NULL AND
                    TRUNC(p_fecha) BETWEEN pr.PRE_OFEDESFEC AND pr.PRE_OFEHASFEC THEN
                 pr.PRE_OFEDESFEC
               WHEN pr.PRE_SUCDESFEC IS NOT NULL AND pr.PRE_SUCHASFEC IS NOT NULL AND
                    TRUNC(p_fecha) BETWEEN pr.PRE_SUCDESFEC AND pr.PRE_SUCHASFEC THEN
                 pr.PRE_SUCDESFEC
               ELSE
                 (
                 SELECT COALESCE(MAX(cp.CAM_FECHA), pr.PRE_FECHA_PROC) 
                 FROM   li_central.LI_DES_CAMBIOS_PRE cp
                 WHERE  cp.CAM_SITIO = pr.PRE_SITIO AND
                        cp.CAM_CEXR  = pr.PRE_ARTEAN13 AND
                        cp.CAM_FECHA <= TRUNC(p_fecha)
                 )
                 --pr.PRE_FECHA_PROC
             END AS FECHA_VIGENCIA
      INTO   v_fecha_vigencia
      FROM   li_central.LI_DES_PRECIOS pr
      WHERE  pr.PRE_SITIO    = p_sucursal AND
             pr.PRE_ARTEAN13 = p_codigo;
    END IF;
    
    IF UPPER(p_tipo_articulo) = li_pkg_articulo_consulta.C_TIPO_ART_CINT THEN
      SELECT CASE
               WHEN pr.PRE_OFEDESFEC IS NOT NULL AND pr.PRE_OFEHASFEC IS NOT NULL AND
                    TRUNC(p_fecha) BETWEEN pr.PRE_OFEDESFEC AND pr.PRE_OFEHASFEC THEN
                 pr.PRE_OFEDESFEC
               WHEN pr.PRE_SUCDESFEC IS NOT NULL AND pr.PRE_SUCHASFEC IS NOT NULL AND
                    TRUNC(p_fecha) BETWEEN pr.PRE_SUCDESFEC AND pr.PRE_SUCHASFEC THEN
                 pr.PRE_SUCDESFEC
               ELSE
                 (
                 SELECT COALESCE(MAX(cp.CAM_FECHA), pr.PRE_FECHA_PROC) 
                 FROM   li_central.LI_DES_CAMBIOS_PRE cp
                 WHERE  cp.CAM_SITIO = pr.PRE_SITIO AND
                        cp.CAM_CEXR  = pr.PRE_ARTEAN13 AND
                        cp.CAM_FECHA <= TRUNC(p_fecha)
                 )
                 --pr.PRE_FECHA_PROC
             END AS FECHA_VIGENCIA
      INTO   v_fecha_vigencia
      FROM   li_central.LI_DES_PRECIOS pr
      WHERE  pr.PRE_SITIO   = p_sucursal AND
             pr.PRE_ARTCINT = p_codigo;
    END IF;
    
    RETURN TRUNC(v_fecha_vigencia);
  EXCEPTION
    WHEN OTHERS THEN
	    RETURN TRUNC(SYSDATE);
  END GET_FECHA_VIGENCIA;
    
  FUNCTION GET_TIPO_PRECIO_VIGENTE(p_tipo_articulo IN VARCHAR2,
                                   p_codigo        IN NUMBER,
                                   p_sucursal      IN NUMBER,
                                   p_fecha         IN DATE) RETURN VARCHAR2 IS
    v_tipo_precio_vigente VARCHAR2(3) := '';
  BEGIN
    IF UPPER(p_tipo_articulo) = li_pkg_articulo_consulta.C_TIPO_ART_CEXR THEN
      SELECT CASE
               WHEN pr.PRE_OFEDESFEC IS NOT NULL AND pr.PRE_OFEHASFEC IS NOT NULL AND
                    TRUNC(p_fecha) BETWEEN pr.PRE_OFEDESFEC AND pr.PRE_OFEHASFEC THEN
                 'OFE'
               WHEN pr.PRE_SUCDESFEC IS NOT NULL AND pr.PRE_SUCHASFEC IS NOT NULL AND
                    TRUNC(p_fecha) BETWEEN pr.PRE_SUCDESFEC AND pr.PRE_SUCHASFEC THEN
                 'SUC'
               ELSE
                 'LIS'
             END AS TIPO_PRECIO_VIGENTE
      INTO   v_tipo_precio_vigente
      FROM   li_central.LI_DES_PRECIOS pr
      WHERE  pr.PRE_SITIO    = p_sucursal AND
             pr.PRE_ARTEAN13 = p_codigo;
    END IF;
    
    IF UPPER(p_tipo_articulo) = li_pkg_articulo_consulta.C_TIPO_ART_CINT THEN
      SELECT CASE
               WHEN pr.PRE_OFEDESFEC IS NOT NULL AND pr.PRE_OFEHASFEC IS NOT NULL AND
                    TRUNC(p_fecha) BETWEEN pr.PRE_OFEDESFEC AND pr.PRE_OFEHASFEC THEN
                 'OFE'
               WHEN pr.PRE_SUCDESFEC IS NOT NULL AND pr.PRE_SUCHASFEC IS NOT NULL AND
                    TRUNC(p_fecha) BETWEEN pr.PRE_SUCDESFEC AND pr.PRE_SUCHASFEC THEN
                 'SUC'
               ELSE
                 'LIS'
             END AS TIPO_PRECIO_VIGENTE
      INTO   v_tipo_precio_vigente
      FROM   li_central.LI_DES_PRECIOS pr
      WHERE  pr.PRE_SITIO   = p_sucursal AND
             pr.PRE_ARTCINT = p_codigo;
    END IF;
    
    RETURN v_tipo_precio_vigente;
  EXCEPTION
    WHEN OTHERS THEN
	    RETURN '';
  END GET_TIPO_PRECIO_VIGENTE;
  
END LI_PKG_ARTICULO_CONSULTA;