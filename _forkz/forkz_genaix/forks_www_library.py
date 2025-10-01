from forkz_comix as GENAICOMIX

_exec(_type,_keyword):
	_cmd_x = GENAICOMIX.aggregate_search_results(query: str)
	_rex = GENAICOMIX.display_results_and_select(_cmd_x)
	_r = GENAICOMIX.display_results_and_select(_rex):
	reurn _r
	
# --- Main execution block ---
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: search by <keyword>")
        sys.exit(1)
    _forkz_keyx = " ".join(sys.argv[1:])
    _r = _exec(_forkz_keyx)
    with open('forkz_library.json','w+') as _forkz_stream_x:
        _forkz_stream_x.write(_r)

