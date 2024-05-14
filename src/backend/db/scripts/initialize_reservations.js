"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require("date-fns"), addDays = _a.addDays, startOfWeek = _a.startOfWeek, addWeeks = _a.addWeeks, format = _a.format;
// Import the pg library
var pool = require("../db");
// Define the reservation data for the first weekend
// Get today's date
var currentDate = new Date();
// Determine if today is Sunday
var isSunday = currentDate.getDay() === 0;
// Get the start of this week (Sunday) and add 5 days to get Friday's date
var fridayDate;
if (isSunday) {
    // If today is Sunday, add 5 days to get next Friday's date
    fridayDate = addDays(startOfWeek(currentDate), 5);
}
else {
    // If today is not Sunday, simply add days to get this Friday's date
    fridayDate = addDays(currentDate, (5 - currentDate.getDay() + 7) % 7);
}
var saturdayDate = addDays(fridayDate, 1);
var reservations = [];
var timeSlots = [4, 6, 8];
var createReservationsFn = function (date, reservations) {
    for (var i = 0; i < timeSlots.length; i++) {
        for (var j = 0; j < 9; j++) {
            reservations.push({
                user_id: null,
                date: date,
                starting_time: timeSlots[i],
                wheel_number: j + 1,
            });
        }
    }
};
createReservationsFn(fridayDate, reservations);
createReservationsFn(saturdayDate, reservations);
// Function to insert reservations into the database
function createInitialReservations() {
    return __awaiter(this, void 0, void 0, function () {
        var client, _i, reservations_1, reservation, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pool.connect()];
                case 1:
                    client = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 7, 8, 9]);
                    _i = 0, reservations_1 = reservations;
                    _a.label = 3;
                case 3:
                    if (!(_i < reservations_1.length)) return [3 /*break*/, 6];
                    reservation = reservations_1[_i];
                    return [4 /*yield*/, client.query("\n                INSERT INTO reservations (user_id, date, starting_time, wheel_number)\n                VALUES ($1, $2, $3, $4)\n            ", [
                            reservation.user_id,
                            reservation.date,
                            reservation.starting_time,
                            reservation.wheel_number,
                        ])];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6:
                    console.log("Initial reservations created successfully.", reservations);
                    return [3 /*break*/, 9];
                case 7:
                    error_1 = _a.sent();
                    console.error("Error creating initial reservations:", error_1);
                    return [3 /*break*/, 9];
                case 8:
                    client.release();
                    return [7 /*endfinally*/];
                case 9: return [2 /*return*/];
            }
        });
    });
}
// Call the function to create initial reservations
createInitialReservations();
