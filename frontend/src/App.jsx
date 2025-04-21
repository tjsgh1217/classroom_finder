import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  useNavigate,
  Navigate,
  useLocation,
} from 'react-router-dom';
import React, { useState, useEffect, createContext, useContext } from 'react';
// import Login from './home_login';
import Header from './component/head';
import Loadmap from './component/Loadmap';
import Mypage from './component/mypage';
import Signup from './component/signup';
import Footer from './component/footer';
import SecondLoadmap from './component/s_Loadmap';

import Build09 from './number_09/build_09';
import Build56 from './number_56/build_56';
import Build06 from './number_06/build_06';
import Build04 from './number_04/build_04';
import Build05 from './number_05/build_05';
import Build11 from './number_11/build_11';
import Build02 from './number_02/build_02';
import Build03 from './number_03/build_03';
import Build26 from './number_26/build_26';
import Build07 from './number_07/build_07';
import Build50 from './number_50/build_50';
import Build42 from './number_42/build_42';
import Build45 from './number_45/build_45';
import Build47 from './number_47/build_47';
import Build71 from './number_71/build_71';
import Build72 from './number_72/build_72';
import Build73 from './number_73/build_73';
import Build74 from './number_74/build_74';
import Build78 from './number_78/build_78';

import Room09B108 from './number_09/B1F/room09B108';
import Room09B110 from './number_09/B1F/room09B110';
import Room090106 from './number_09/1F/room090106';
import Room090119 from './number_09/1F/room090119';
import Room090201 from './number_09/2F/room090201';
import Room090202 from './number_09/2F/room090202';
import Room090206 from './number_09/2F/room090206';
import Room090210 from './number_09/2F/room090210';
import Room090215 from './number_09/2F/room090215';
import Room090219 from './number_09/2F/room090219';
import Room090221 from './number_09/2F/room090221';
import Room090302 from './number_09/3F/room090302';
import Room090305 from './number_09/3F/room090305';
import Room090307 from './number_09/3F/room090307';
import Room090316 from './number_09/3F/room090316';
import Room090321 from './number_09/3F/room090321';
import Room090325 from './number_09/3F/room090325';
import Room090320 from './number_09/3F/room090320';
import Room090327 from './number_09/3F/room090327';
import Room090401 from './number_09/4F/room090401';
import Room090402 from './number_09/4F/room090402';
import Room090405 from './number_09/4F/room090405';
import Room090424 from './number_09/4F/room090424';
import Room090408 from './number_09/4F/room090408';
import Room090409 from './number_09/4F/room090409';
import Room090410 from './number_09/4F/room090410';
import Room090411 from './number_09/4F/room090411';
import Room090420 from './number_09/4F/room090420';
import Room090425 from './number_09/4F/room090425';
import Room090501 from './number_09/5F/room090501';
import Room090502 from './number_09/5F/room090502';
import Room090503 from './number_09/5F/room090503';
import Room090505 from './number_09/5F/room090505';
import Room090516 from './number_09/5F/room090516';
import Room090517 from './number_09/5F/room090517';
import Room090518 from './number_09/5F/room090518';
import Room090519 from './number_09/5F/room090519';
import Room090520 from './number_09/5F/room090520';
import Room090522 from './number_09/5F/room090522';
import Room090524 from './number_09/5F/room090524';

import Room560116 from './number_56/1F/room560116';
import Room560108 from './number_56/1F/room560108';
import Room560201 from './number_56/2F/room560201';
import Room560203 from './number_56/2F/room560203';
import Room560306 from './number_56/3F/room560306';
import Room560401 from './number_56/4F/room560401';
import Room560402 from './number_56/4F/room560402';
import Room560403 from './number_56/4F/room560403';
import Room560501 from './number_56/5F/room560501';
import Room560502 from './number_56/5F/room560502';
import Room560505 from './number_56/5F/room560505';
import Room560521 from './number_56/5F/room560521';
import Room560524 from './number_56/5F/room560524';
import Room560610 from './number_56/6F/room560610';
import Room560611 from './number_56/6F/room560611';
import Room560613 from './number_56/6F/room560613';
import Room560614 from './number_56/6F/room560614';
import Room560622 from './number_56/6F/room560622';
import Room560701 from './number_56/7F/room560701';
import Room560704 from './number_56/7F/room560704';
import Room560705 from './number_56/7F/room560705';
import Room560706 from './number_56/7F/room560706';
import Room560707 from './number_56/7F/room560707';
import Room560708 from './number_56/7F/room560708';
import Room560710 from './number_56/7F/room560710';
import Room560711 from './number_56/7F/room560711';
import Room560712 from './number_56/7F/room560712';
import Room560909 from './number_56/9F/room560909';
import Room560910 from './number_56/9F/room560910';

import Room06B101 from './number_06/B1F/room06B101';
import Room06B102 from './number_06/B1F/room06B102';
import Room060107 from './number_06/1F/room060107';
import Room060114 from './number_06/1F/room060114';
import Room060201 from './number_06/2F/room060201';
import Room060225 from './number_06/2F/room060225';
import Room060230 from './number_06/2F/room060230';
import Room060212 from './number_06/2F/room060212';
import Room060213 from './number_06/2F/room060213';
import Room060217 from './number_06/2F/room060217';
import Room060228 from './number_06/2F/room060228';
import Room060311 from './number_06/3F/room060311';
import Room060326 from './number_06/3F/room060326';
import Room060334 from './number_06/3F/room060334';
import Room060335 from './number_06/3F/room060335';
import Room060402 from './number_06/4F/room060402';
import Room060403 from './number_06/4F/room060403';
import Room060404 from './number_06/4F/room060404';
import Room060405 from './number_06/4F/room060405';
import Room060406 from './number_06/4F/room060406';
import Room060407 from './number_06/4F/room060407';
import Room060409 from './number_06/4F/room060409';
import Room060410 from './number_06/4F/room060410';
import Room060417 from './number_06/4F/room060417';
import Room060419 from './number_06/4F/room060419';
import Room060420 from './number_06/4F/room060420';
import Room060424 from './number_06/4F/room060424';
import Room060433 from './number_06/4F/room060433';
import Room060501 from './number_06/5F/room060501';
import Room060503 from './number_06/5F/room060503';
import Room060504 from './number_06/5F/room060504';
import Room060505 from './number_06/5F/room060505';
import Room060506 from './number_06/5F/room060506';
import Room060509 from './number_06/5F/room060509';
import Room060511 from './number_06/5F/room060511';
import Room060517 from './number_06/5F/room060517';
import Room060510 from './number_06/5F/room060510';
import Room060520 from './number_06/5F/room060520';
import Room060526 from './number_06/5F/room060526';
import Room060527 from './number_06/5F/room060527';
import Room060528 from './number_06/5F/room060528';
import Room060529 from './number_06/5F/room060529';

import Room260107 from './number_26/1F/room260107';
import Room260214 from './number_26/2F/room260214';
import Room260215 from './number_26/2F/room260215';
import Room260216 from './number_26/2F/room260216';
import Room260222 from './number_26/2F/room260222';
import Room260223 from './number_26/2F/room260223';
import Room260228 from './number_26/2F/room260228';
import Room260229 from './number_26/2F/room260229';

import Room030106 from './number_03/1F/room030106';
import Room030111 from './number_03/1F/room030111';
import Room030117 from './number_03/1F/room030117';
import Room030118 from './number_03/1F/room030118';
import Room030119 from './number_03/1F/room030119';
import Room030120 from './number_03/1F/room030120';
import Room030310 from './number_03/3F/room030310';
import Room030323 from './number_03/3F/room030323';
import Room030401 from './number_03/4F/room030401';
import Room030410 from './number_03/4F/room030410';
import Room030411 from './number_03/4F/room030411';
import Room030412 from './number_03/4F/room030412';
import Room030413 from './number_03/4F/room030413';
import Room030414 from './number_03/4F/room030414';
import Room030415 from './number_03/4F/room030415';

import Room050112 from './number_05/1F/room050112';
import Room050349 from './number_05/3F/room050349';
import Room050350 from './number_05/3F/room050350';
import Room050351 from './number_05/3F/room050351';
import Room050430 from './number_05/4F/room050430';
import Room050436 from './number_05/4F/room050436';
import Room050431 from './number_05/4F/room050431';
import Room050432 from './number_05/4F/room050432';
import Room050435 from './number_05/4F/room050435';
import Room050440 from './number_05/4F/room050440';
import Room050501 from './number_05/5F/room050511';
import Room050503 from './number_05/5F/room050503';
import Room050504 from './number_05/5F/room050504';
import Room050505 from './number_05/5F/room050505';
import Room050506 from './number_05/5F/room050506';
import Room050508 from './number_05/5F/room050508';
import Room050510 from './number_05/5F/room050510';
import Room050511 from './number_05/5F/room050511';
import Room050512 from './number_05/5F/room050512';
import Room050514 from './number_05/5F/room050514';
import Room050516 from './number_05/5F/room050516';
import Room050517 from './number_05/5F/room050517';
import Room050521 from './number_05/5F/room050521';
import Room050603 from './number_05/6F/room050603';
import Room050604 from './number_05/6F/room050604';
import Room050606 from './number_05/6F/room050606';
import Room050607 from './number_05/6F/room050607';
import Room050608 from './number_05/6F/room050608';
import Room050609 from './number_05/6F/room050609';
import Room050610 from './number_05/6F/room050610';
import Room050615 from './number_05/6F/room050615';
import Room050616 from './number_05/6F/room050616';
import Room050701 from './number_05/7F/room050701';
import Room050702 from './number_05/7F/room050702';
import Room050703 from './number_05/7F/room050703';
import Room050704 from './number_05/7F/room050704';
import Room050705 from './number_05/7F/room050705';
import Room050708 from './number_05/7F/room050708';
import Room050709 from './number_05/7F/room050709';

import Room040101 from './number_04/1F/room040101';
import Room040102 from './number_04/1F/room040102';
import Room040203 from './number_04/2F/room040203';
import Room040208 from './number_04/2F/room040208';
import Room040221 from './number_04/2F/room040221';
import Room040222 from './number_04/2F/room040222';
import Room040223 from './number_04/2F/room040223';
import Room040224 from './number_04/2F/room040224';
import Room040313 from './number_04/3F/room040313';
import Room040314 from './number_04/3F/room040314';
import Room040316 from './number_04/3F/room040316';
import Room040401 from './number_04/4F/room040401';
import Room040402 from './number_04/4F/room040402';
import Room040403 from './number_04/4F/room040403';
import Room040404 from './number_04/4F/room040404';
import Room040405 from './number_04/4F/room040405';
import Room040407 from './number_04/4F/room040407';
import Room040409 from './number_04/4F/room040409';
import Room040425 from './number_04/4F/room040425';
import Room040426 from './number_04/4F/room040426';
import Room040427 from './number_04/4F/room040427';
import Room040501 from './number_04/5F/room040501';
import Room040503 from './number_04/5F/room040503';
import Room040506 from './number_04/5F/room040506';
import Room040507 from './number_04/5F/room040507';
import Room040508 from './number_04/5F/room040508';
import Room040509 from './number_04/5F/room040509';
import Room040510 from './number_04/5F/room040510';

import Room020101 from './number_02/1F/room020101';
import Room020202 from './number_02/2F/room020202';
import Room020203 from './number_02/2F/room020203';
import Room020204 from './number_02/2F/room020204';
import Room020205 from './number_02/2F/room020205';
import Room020210 from './number_02/2F/room020210';
import Room020211 from './number_02/2F/room020211';
import Room020212 from './number_02/2F/room020212';
import Room020301 from './number_02/3F/room020301';
import Room020305 from './number_02/3F/room020305';
import Room020311 from './number_02/3F/room020311';
import Room020312 from './number_02/3F/room020312';
import Room020313 from './number_02/3F/room020313';
import Room020401 from './number_02/4F/room020401';
import Room020402 from './number_02/4F/room020402';
import Room020403 from './number_02/4F/room020403';
import Room020405 from './number_02/4F/room020405';
import Room020406 from './number_02/4F/room020406';
import Room020407 from './number_02/4F/room020407';
import Room020408 from './number_02/4F/room020408';

import Room110109 from './number_11/1F/room110109';
import Room110113 from './number_11/1F/room110113';
import Room110118 from './number_11/1F/room110118';
import Room110204 from './number_11/2F/room110204';
import Room110205 from './number_11/2F/room110205';
import Room110206 from './number_11/2F/room110206';
import Room110210 from './number_11/2F/room110210';
import Room110213 from './number_11/2F/room110213';
import Room110217 from './number_11/2F/room110217';
import Room110219 from './number_11/2F/room110219';
import Room110220 from './number_11/2F/room110220';
import Room110221 from './number_11/2F/room110221';
import Room110223 from './number_11/2F/room110223';
import Room110303 from './number_11/3F/room110303';
import Room110304 from './number_11/3F/room110304';
import Room110305 from './number_11/3F/room110305';
import Room110306 from './number_11/3F/room110306';
import Room110307 from './number_11/3F/room110307';
import Room110308 from './number_11/3F/room110308';
import Room110310 from './number_11/3F/room110310';
import Room110311 from './number_11/3F/room110311';
import Room110312 from './number_11/3F/room110312';
import Room110402 from './number_11/4F/room110402';
import Room110408 from './number_11/4F/room110408';
import Room110409 from './number_11/4F/room110409';
import Room110410 from './number_11/4F/room110410';

import Room420125 from './number_42/1F/room420125';
import Room420126 from './number_42/1F/room420126';
import Room420147 from './number_42/1F/room420147';

import Room450103 from './number_45/1F/room450103';
import Room450201 from './number_45/2F/room450201';
import Room450202 from './number_45/2F/room450202';

import Room470101 from './number_47/1F/room470101';
import Room470106 from './number_47/1F/room470106';

import Room500101 from './number_50/1F/room500101';
import Room500102 from './number_50/1F/room500102';
import Room500103 from './number_50/1F/room500103';
import Room500201 from './number_50/2F/room500201';
import Room500205 from './number_50/2F/room500205';
import Room500217 from './number_50/2F/room500217';
import Room500301 from './number_50/3F/room500301';
import Room500302 from './number_50/3F/room500302';
import Room500304 from './number_50/3F/room500304';
import Room500305 from './number_50/3F/room500305';
import Room500306 from './number_50/3F/room500306';
import Room500401 from './number_50/4F/room500401';
import Room500402 from './number_50/4F/room500402';
import Room500403 from './number_50/4F/room500403';
import Room500501 from './number_50/5F/room500501';
import Room500502 from './number_50/5F/room500502';
import Room500503 from './number_50/5F/room500503';
import Room500504 from './number_50/5F/room500504';
import Room500505 from './number_50/5F/room500505';
import Room500506 from './number_50/5F/room500506';
import Room500507 from './number_50/5F/room500507';
import Room500508 from './number_50/5F/room500508';

import Room070101 from './number_07/1F/room070101';
import Room070102 from './number_07/1F/room070102';
import Room070103 from './number_07/1F/room070103';
import Room070205 from './number_07/2F/room070205';
import Room070206 from './number_07/2F/room070206';
import Room070216 from './number_07/2F/room070216';
import Room070301 from './number_07/3F/room070301';
import Room070302 from './number_07/3F/room070302';
import Room070303 from './number_07/3F/room070303';
import Room070305 from './number_07/3F/room070305';
import Room070306 from './number_07/3F/room070306';
import Room070307 from './number_07/3F/room070307';
import Room070308 from './number_07/3F/room070308';
import Room070309 from './number_07/3F/room070309';
import Room070320 from './number_07/3F/room070320';
import Room070321 from './number_07/3F/room070321';
import Room070322 from './number_07/3F/room070322';
import Room070402 from './number_07/4F/room070402';
import Room070403 from './number_07/4F/room070403';
import Room070406 from './number_07/4F/room070406';
import Room070412 from './number_07/4F/room070412';
import Room070413 from './number_07/4F/room070413';
import Room070415 from './number_07/4F/room070415';
import Room070416 from './number_07/4F/room070416';
import Room070422 from './number_07/4F/room070422';
import Room070423 from './number_07/4F/room070423';
import Room070424 from './number_07/4F/room070424';
import Room070501 from './number_07/5F/room070501';
import Room070502 from './number_07/5F/room070502';
import Room070506 from './number_07/5F/room070506';
import Room070508 from './number_07/5F/room070508';
import Room070509 from './number_07/5F/room070509';
import Room070510 from './number_07/5F/room070510';
import Room070511 from './number_07/5F/room070511';
import Room070512 from './number_07/5F/room070512';
import Room070517 from './number_07/5F/room070517';
import Room070518 from './number_07/5F/room070518';
import Room070519 from './number_07/5F/room070519';

import Room710101 from './number_71/1F/room710101';
import Room710118 from './number_71/1F/room710118';

import Room720106 from './number_72/1F/room720106';
import Room720107 from './number_72/1F/room720107';
import Room720116 from './number_72/1F/room720116';
import Room720124 from './number_72/1F/room720124';
import Room720125 from './number_72/1F/room720125';
import Room720126 from './number_72/1F/room720126';
import Room720128 from './number_72/1F/room720128';
import Room720129 from './number_72/1F/room720129';
import Room720130 from './number_72/1F/room720130';
import Room720132 from './number_72/1F/room720132';
import Room720136 from './number_72/1F/room720136';
import Room720137 from './number_72/1F/room720137';
import Room720162 from './number_72/1F/room720162';
import Room720208 from './number_72/2F/room720208';
import Room720225 from './number_72/2F/room720225';
import Room720226 from './number_72/2F/room720226';

import Room730106 from './number_73/1F/room730106';
import Room730112 from './number_73/1F/room730112';
import Room730116 from './number_73/1F/room730116';
import Room730124 from './number_73/1F/room730124';
import Room730126 from './number_73/1F/room730126';
import Room730127 from './number_73/1F/room730127';
import Room730128 from './number_73/1F/room730128';
import Room730129 from './number_73/1F/room730129';
import Room730130 from './number_73/1F/room730130';
import Room730131 from './number_73/1F/room730131';
import Room730132 from './number_73/1F/room730132';
import Room730133 from './number_73/1F/room730133';

import Room740201 from './number_74/2F/room740201';
import Room740202 from './number_74/2F/room740202';
import Room740204 from './number_74/2F/room740204';

import Room780112 from './number_78/1F/room780112';
import Room780113 from './number_78/1F/room780113';
import Room780114 from './number_78/1F/room780114';

function RoomRouter() {
  const { roomId } = useParams();

  const roomComponents = {
    '09B108': <Room09B108 />,
    '09B110': <Room09B110 />,
    '090106': <Room090106 />,
    '090119': <Room090119 />,
    '090201': <Room090201 />,
    '090202': <Room090202 />,
    '090206': <Room090206 />,
    '090210': <Room090210 />,
    '090215': <Room090215 />,
    '090219': <Room090219 />,
    '090221': <Room090221 />,
    '090302': <Room090302 />,
    '090305': <Room090305 />,
    '090307': <Room090307 />,
    '090316': <Room090316 />,
    '090321': <Room090321 />,
    '090325': <Room090325 />,
    '090320': <Room090320 />,
    '090327': <Room090327 />,
    '090401': <Room090401 />,
    '090402': <Room090402 />,
    '090405': <Room090405 />,
    '090424': <Room090424 />,
    '090425': <Room090425 />,
    '090408': <Room090408 />,
    '090409': <Room090409 />,
    '090410': <Room090410 />,
    '090411': <Room090411 />,
    '090420': <Room090420 />,
    '090501': <Room090501 />,
    '090502': <Room090502 />,
    '090503': <Room090503 />,
    '090505': <Room090505 />,
    '090516': <Room090516 />,
    '090517': <Room090517 />,
    '090518': <Room090518 />,
    '090519': <Room090519 />,
    '090520': <Room090520 />,
    '090522': <Room090522 />,
    '090524': <Room090524 />,

    560116: <Room560116 />,
    560108: <Room560108 />,
    560201: <Room560201 />,
    560203: <Room560203 />,
    560306: <Room560306 />,
    560401: <Room560401 />,
    560402: <Room560402 />,
    560403: <Room560403 />,
    560501: <Room560501 />,
    560502: <Room560502 />,
    560505: <Room560505 />,
    560521: <Room560521 />,
    560524: <Room560524 />,
    560610: <Room560610 />,
    560611: <Room560611 />,
    560613: <Room560613 />,
    560614: <Room560614 />,
    560622: <Room560622 />,
    560701: <Room560701 />,
    560704: <Room560704 />,
    560705: <Room560705 />,
    560706: <Room560706 />,
    560707: <Room560707 />,
    560708: <Room560708 />,
    560710: <Room560710 />,
    560711: <Room560711 />,
    560712: <Room560712 />,
    560909: <Room560909 />,
    560910: <Room560910 />,

    '06B101': <Room06B101 />,
    '06B102': <Room06B102 />,
    '060107': <Room060107 />,
    '060114': <Room060114 />,
    '060201': <Room060201 />,
    '060225': <Room060225 />,
    '060230': <Room060230 />,
    '060212': <Room060212 />,
    '060213': <Room060213 />,
    '060217': <Room060217 />,
    '060228': <Room060228 />,
    '060311': <Room060311 />,
    '060326': <Room060326 />,
    '060334': <Room060334 />,
    '060335': <Room060335 />,
    '060402': <Room060402 />,
    '060403': <Room060403 />,
    '060404': <Room060404 />,
    '060405': <Room060405 />,
    '060406': <Room060406 />,
    '060407': <Room060407 />,
    '060409': <Room060409 />,
    '060410': <Room060410 />,
    '060417': <Room060417 />,
    '060419': <Room060419 />,
    '060420': <Room060420 />,
    '060424': <Room060424 />,
    '060433': <Room060433 />,
    '060501': <Room060501 />,
    '060503': <Room060503 />,
    '060504': <Room060504 />,
    '060505': <Room060505 />,
    '060506': <Room060506 />,
    '060509': <Room060509 />,
    '060511': <Room060511 />,
    '060517': <Room060517 />,
    '060510': <Room060510 />,
    '060520': <Room060520 />,
    '060526': <Room060526 />,
    '060527': <Room060527 />,
    '060528': <Room060528 />,
    '060529': <Room060529 />,

    260107: <Room260107 />,
    260214: <Room260214 />,
    260215: <Room260215 />,
    260216: <Room260216 />,
    260222: <Room260222 />,
    260223: <Room260223 />,
    260228: <Room260228 />,
    260229: <Room260229 />,

    '030106': <Room030106 />,
    '030111': <Room030111 />,
    '030117': <Room030117 />,
    '030118': <Room030118 />,
    '030119': <Room030119 />,
    '030120': <Room030120 />,
    '030310': <Room030310 />,
    '030323': <Room030323 />,
    '030401': <Room030401 />,
    '030410': <Room030410 />,
    '030411': <Room030411 />,
    '030412': <Room030412 />,
    '030413': <Room030413 />,
    '030414': <Room030414 />,
    '030415': <Room030415 />,

    '050112': <Room050112 />,
    '050349': <Room050349 />,
    '050350': <Room050350 />,
    '050351': <Room050351 />,
    '050430': <Room050430 />,
    '050436': <Room050436 />,
    '050431': <Room050431 />,
    '050432': <Room050432 />,
    '050435': <Room050435 />,
    '050440': <Room050440 />,
    '050501': <Room050501 />,
    '050503': <Room050503 />,
    '050504': <Room050504 />,
    '050505': <Room050505 />,
    '050506': <Room050506 />,
    '050508': <Room050508 />,
    '050510': <Room050510 />,
    '050511': <Room050511 />,
    '050512': <Room050512 />,
    '050514': <Room050514 />,
    '050516': <Room050516 />,
    '050517': <Room050517 />,
    '050521': <Room050521 />,
    '050603': <Room050603 />,
    '050604': <Room050604 />,
    '050606': <Room050606 />,
    '050607': <Room050607 />,
    '050608': <Room050608 />,
    '050609': <Room050609 />,
    '050610': <Room050610 />,
    '050615': <Room050615 />,
    '050616': <Room050616 />,
    '050701': <Room050701 />,
    '050702': <Room050702 />,
    '050703': <Room050703 />,
    '050704': <Room050704 />,
    '050705': <Room050705 />,
    '050708': <Room050708 />,
    '050709': <Room050709 />,

    '040101': <Room040101 />,
    '040102': <Room040102 />,
    '040203': <Room040203 />,
    '040208': <Room040208 />,
    '040221': <Room040221 />,
    '040222': <Room040222 />,
    '040223': <Room040223 />,
    '040224': <Room040224 />,
    '040313': <Room040313 />,
    '040314': <Room040314 />,
    '040316': <Room040316 />,
    '040401': <Room040401 />,
    '040402': <Room040402 />,
    '040403': <Room040403 />,
    '040404': <Room040404 />,
    '040405': <Room040405 />,
    '040407': <Room040407 />,
    '040409': <Room040409 />,
    '040425': <Room040425 />,
    '040426': <Room040426 />,
    '040427': <Room040427 />,
    '040501': <Room040501 />,
    '040503': <Room040503 />,
    '040506': <Room040506 />,
    '040507': <Room040507 />,
    '040508': <Room040508 />,
    '040509': <Room040509 />,
    '040510': <Room040510 />,

    '020101': <Room020101 />,
    '020202': <Room020202 />,
    '020203': <Room020203 />,
    '020204': <Room020204 />,
    '020205': <Room020205 />,
    '020210': <Room020210 />,
    '020211': <Room020211 />,
    '020212': <Room020212 />,
    '020301': <Room020301 />,
    '020305': <Room020305 />,
    '020311': <Room020311 />,
    '020312': <Room020312 />,
    '020313': <Room020313 />,
    '020401': <Room020401 />,
    '020402': <Room020402 />,
    '020403': <Room020403 />,
    '020405': <Room020405 />,
    '020406': <Room020406 />,
    '020407': <Room020407 />,
    '020408': <Room020408 />,

    110109: <Room110109 />,
    110113: <Room110113 />,
    110118: <Room110118 />,
    110204: <Room110204 />,
    110205: <Room110205 />,
    110206: <Room110206 />,
    110210: <Room110210 />,
    110213: <Room110213 />,
    110217: <Room110217 />,
    110219: <Room110219 />,
    110220: <Room110220 />,
    110221: <Room110221 />,
    110223: <Room110223 />,
    110303: <Room110303 />,
    110304: <Room110304 />,
    110305: <Room110305 />,
    110306: <Room110306 />,
    110307: <Room110307 />,
    110308: <Room110308 />,
    110310: <Room110310 />,
    110311: <Room110311 />,
    110312: <Room110312 />,
    110402: <Room110402 />,
    110408: <Room110408 />,
    110409: <Room110409 />,
    110410: <Room110410 />,

    420125: <Room420125 />,
    420126: <Room420126 />,
    420147: <Room420147 />,

    450103: <Room450103 />,
    450201: <Room450201 />,
    450202: <Room450202 />,

    470101: <Room470101 />,
    470106: <Room470106 />,

    500101: <Room500101 />,
    500102: <Room500102 />,
    500103: <Room500103 />,
    500201: <Room500201 />,
    500205: <Room500205 />,
    500217: <Room500217 />,
    500301: <Room500301 />,
    500302: <Room500302 />,
    500304: <Room500304 />,
    500305: <Room500305 />,
    500306: <Room500306 />,
    500401: <Room500401 />,
    500402: <Room500402 />,
    500403: <Room500403 />,
    500501: <Room500501 />,
    500502: <Room500502 />,
    500503: <Room500503 />,
    500504: <Room500504 />,
    500505: <Room500505 />,
    500506: <Room500506 />,
    500507: <Room500507 />,
    500508: <Room500508 />,

    '070101': <Room070101 />,
    '070102': <Room070102 />,
    '070103': <Room070103 />,
    '070205': <Room070205 />,
    '070206': <Room070206 />,
    '070216': <Room070216 />,
    '070301': <Room070301 />,
    '070302': <Room070302 />,
    '070303': <Room070303 />,
    '070305': <Room070305 />,
    '070306': <Room070306 />,
    '070307': <Room070307 />,
    '070308': <Room070308 />,
    '070309': <Room070309 />,
    '070320': <Room070320 />,
    '070321': <Room070321 />,
    '070322': <Room070322 />,
    '070402': <Room070402 />,
    '070403': <Room070403 />,
    '070406': <Room070406 />,
    '070412': <Room070412 />,
    '070413': <Room070413 />,
    '070415': <Room070415 />,
    '070416': <Room070416 />,
    '070422': <Room070422 />,
    '070423': <Room070423 />,
    '070424': <Room070424 />,
    '070501': <Room070501 />,
    '070502': <Room070502 />,
    '070506': <Room070506 />,
    '070508': <Room070508 />,
    '070509': <Room070509 />,
    '070510': <Room070510 />,
    '070511': <Room070511 />,
    '070512': <Room070512 />,
    '070517': <Room070517 />,
    '070518': <Room070518 />,
    '070519': <Room070519 />,

    710101: <Room710101 />,
    710118: <Room710118 />,

    720106: <Room720106 />,
    720107: <Room720107 />,
    720116: <Room720116 />,
    720124: <Room720124 />,
    720125: <Room720125 />,
    720126: <Room720126 />,
    720128: <Room720128 />,
    720129: <Room720129 />,
    720130: <Room720130 />,
    720132: <Room720132 />,
    720136: <Room720136 />,
    720137: <Room720137 />,
    720162: <Room720162 />,
    720208: <Room720208 />,
    720225: <Room720225 />,
    720226: <Room720226 />,

    730106: <Room730106 />,
    730112: <Room730112 />,
    730116: <Room730116 />,
    730124: <Room730124 />,
    730126: <Room730126 />,
    730127: <Room730127 />,
    730128: <Room730128 />,
    730129: <Room730129 />,
    730130: <Room730130 />,
    730131: <Room730131 />,
    730132: <Room730132 />,
    730133: <Room730133 />,

    740201: <Room740201 />,
    740202: <Room740202 />,
    740204: <Room740204 />,

    780112: <Room780112 />,
    780113: <Room780113 />,
    780114: <Room780114 />,
  };

  return roomComponents[roomId] || <div>해당 방을 찾을 수 없습니다.</div>;
}

function BuildingRouter() {
  const { buildingId } = useParams();

  if (buildingId === '9') return <Build09 />;
  if (buildingId === '56') return <Build56 />;
  if (buildingId === '6') return <Build06 />;
  if (buildingId === '4') return <Build04 />;
  if (buildingId === '5') return <Build05 />;
  if (buildingId === '11') return <Build11 />;
  if (buildingId === '2') return <Build02 />;
  if (buildingId === '3') return <Build03 />;
  if (buildingId === '26') return <Build26 />;
  if (buildingId === '7') return <Build07 />;
  if (buildingId === '50') return <Build50 />;
  if (buildingId === '42') return <Build42 />;
  if (buildingId === '45') return <Build45 />;
  if (buildingId === '47') return <Build47 />;
  if (buildingId === '71') return <Build71 />;
  if (buildingId === '72') return <Build72 />;
  if (buildingId === '73') return <Build73 />;
  if (buildingId === '74') return <Build74 />;
  if (buildingId === '78') return <Build78 />;
}
const AuthContext = createContext();
function useAuth() {
  return useContext(AuthContext);
}
function isTokenExpired(token) {
  if (!token) return true;

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64));

    return payload.exp * 1000 < Date.now();
  } catch (e) {
    return true;
  }
}

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenValidity = () => {
      const token = localStorage.getItem('token');

      if (!token || isTokenExpired(token)) {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    };

    checkTokenValidity();

    const intervalId = setInterval(checkTokenValidity, 60000);
    return () => clearInterval(intervalId);
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

function ProtectedRoute({ element }) {
  const { isLoggedIn, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate('/');
      alert('로그인이 필요한 페이지입니다.');
    }
  }, [isLoggedIn, isLoading, navigate]);

  return isLoading ? <div>로딩 중...</div> : isLoggedIn ? element : null;
}

function AppRoutes() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const location = useLocation();
  const hideFooterPaths = ['/loadmap', '/s_Loadmap'];
  const shouldShowFooter = !hideFooterPaths.includes(location.pathname);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Navigate to="/loadmap" />} />

        {/* <Route
          path="/"
          element={
            <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        /> */}
        <Route path="/loadmap" element={<Loadmap />} />
        <Route path="/s_loadmap" element={<SecondLoadmap />} />
        <Route path="/component/signup" element={<Signup />} />
        <Route path="/building/:buildingId" element={<BuildingRouter />} />
        <Route
          path="/building/:buildingId/room/:roomId"
          element={<RoomRouter />}
        />

        <Route
          path="/component/mypage"
          element={<ProtectedRoute element={<Mypage />} />}
        />
      </Routes>
      {shouldShowFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
